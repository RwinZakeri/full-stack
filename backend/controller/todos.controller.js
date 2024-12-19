const dbFunc = require("../model/todo.model");

const getAllTodos = async (req, res) => {
  const allTodos = await dbFunc.findAllTodos();
  res.write(JSON.stringify(allTodos));
  res.end();
};

const AddOneTodo = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const dbReponse = dbFunc.insertOneItem(body);
    res.write(JSON.stringify(await dbReponse));
    res.end();
  });
};

const removeTodo = async (req, res) => {
  const id = req.url.split("/")[2];
  const dbResponse = await dbFunc.deleteItem(id);
  console.log(dbResponse);
  res.end(JSON.stringify({ status: dbResponse.acknowledged }));
};

const findTodo = async (req, res) => {
  const id = req.url.split("/")[2];

  const response = await dbFunc.findItem(id);
  console.log(response);
  // res.write(JSON.stringify(response));
  res.write(JSON.stringify(response));
  res.end();
};

const updateTodo = async (req, res) => {
  console.log("updated");

  const id = req.url.split("/")[2];
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  res.on("end", () => {
    const response = dbFunc.updateTodo(id, body);
    // res.write(JSON.stringify(response));

    res.end("test");
  });
};

const TodosControllers = {
  getAllTodos,
  AddOneTodo,
  removeTodo,
  findTodo,
  updateTodo,
};

module.exports = TodosControllers;
