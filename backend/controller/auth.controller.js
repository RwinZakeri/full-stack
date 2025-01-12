const jwt = require("jsonwebtoken");

const validateUserFields = require("../libs/validation.user.feilds");
const {
  findAll,
  insertOneUser,
  deleteOne,
  deleteAll,
  isExistUser,
} = require("../models/user.model");

const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });

const allUsers = async (req, res) => {
  try {
    const modelResponse = await findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(modelResponse));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message || "Failed to fetch users" }));
  }
};

const addUsers = async (req, res) => {
  try {
    const body = await parseRequestBody(req);
    const data = JSON.parse(body);

    // Validate all fields
    const errors = validateUserFields(data);
    if (errors.length > 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: 400, message: "Validation errors", errors })
      );
      return;
    }

    const insertUserResponse = await insertOneUser(data);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: 201,
        message: "User created successfully",
        data: insertUserResponse,
      })
    );
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message || "Something went wrong" }));
  }
};

const removeUser = async (req, res) => {
  try {
    const id = req.url.split("/")[2];
    const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(id);
    if (!isValidObjectId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: 400,
          message: "Invalid user ID format",
        })
      );
    }
    const deleteResponse = await deleteOne(id);
    if (!deleteResponse || deleteResponse.deletedCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: 404,
          message: "User not found",
        })
      );
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: 200,
        message: "User deleted successfully",
      })
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: 500,
        message: "Something went wrong",
        error: error.message,
      })
    );
  }
};

const removeAllUser = async (req, res) => {
  const deleteAllResponse = await deleteAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: 200, message: "delete all successfully" }));
};

const loginUser = async (req, res) => {
  const body = await JSON.parse(await parseRequestBody(req));
  const dbResponse = await isExistUser(body);

  if (dbResponse) {
    const token = jwt.sign({ id: dbResponse._id }, "hi", {
      expiresIn: "10h",
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 200, token }));

    res.end("");
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 404, message: "no user found" }));
    res.end("");
  }
};

const checkToken = (req, res) => {
  const token = req.headers["token"];
  if (!token) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 400, message: "no token set" }));
    res.end();
    return;
  }

  try {
    const jwtDecoded = jwt.verify(token, "hi").id;
    console.log("token", jwtDecoded);
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ status: 400, message: "invalid token" }));
    res.end();
    return;
  }
  res.end("don");
};

module.exports = {
  allUsers,
  addUsers,
  removeUser,
  removeAllUser,
  loginUser,
  checkToken,
};
