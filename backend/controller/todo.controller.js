const {
  insertOneTodo,
  findTodo,
  deleteOneTodo,
  patchTodo,
} = require("../models/todo.model");
const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/user.model");

const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });

const addTodo = async (req, res) => {
  const body = await JSON.parse(await parseRequestBody(req));

  const token = req.headers["token"];
  console.log(body);
  if (!token) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 400, message: "no token set" }));
    res.end("");

    return;
  }
  try {
    const jwtDecoded = jwt.verify(token, "hi").id;
    console.log(jwtDecoded);
    const insertResponse = await insertOneTodo(jwtDecoded, body);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 201, insertResponse }));
    res.end();
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 400, message: "invalid token" }));
    res.end();
  }
};

const GetTodos = async (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 400, message: "no token set" }));
    res.end();
    return;
  }

  try {
    const jwtDecoded = jwt.verify(token, "hi").id;
    const findTodoResponse = await findTodo(jwtDecoded);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(findTodoResponse));
    res.end();
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 400, message: "invalid token" }));
    res.end();
  }
};

const deleteTodo = async (req, res) => {
  const id = req.url.split("/")[2];
  const deletedResponse = await deleteOneTodo(id);
  if (deletedResponse) {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 200, message: "deleted succesffully" }));
    res.end();
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({ status: 400, message: "no such id for todo valid" })
    );
    res.end();
  }
  res.end("");
};

const deleteAllTodo = async (req, res) => {
  const deletedResponse = await deleteOneTodo();
  if (deletedResponse) {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 200, message: "deleted succesffully" }));
    res.end();
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({ status: 400, message: "no such id for todo valid" })
    );
    res.end();
  }
  res.end("");
};

const updateTodo = async (req, res) => {
  const body = await JSON.parse(await parseRequestBody(req));
  const id = req.url.split("/")[2];
  const patchResponse = await patchTodo(id, body);
  if (patchResponse === 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({ status: 400, message: `No todo found with id: ${id}` })
    );
    res.end();
  } else if (patchResponse > 0) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        status: 200,
        message: `Todo with id: ${id} updated successfully.`,
      })
    );
    res.end();
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        status: 400,
        message: `Todo with id: ${id} was not modified.`,
      })
    );
    res.end();
  }
};

module.exports = {
  addTodo,
  GetTodos,
  deleteTodo,
  deleteAllTodo,
  updateTodo,
};
