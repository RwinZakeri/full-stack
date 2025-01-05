const validateUserFields = require("../libs/validation.user.feilds");
const { findAll, insertOneUser } = require("../models/user.model");

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

module.exports = {
  allUsers,
  addUsers,
};
