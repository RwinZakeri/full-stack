const { MongoClient } = require("mongodb");
const { findAll } = require("../models/user.model");

const allUsers = async (req, res) => {
  try {
    console.log("start");
    const modelResponse = await findAll();
    console.log("end");

    res.writeHead(200, { "Content-Type": "application/json" });

    res.write("hi");
    // res.end();
  } catch (err) {
    console.error("Error in userById controller:", err); //   Log error details
    res.status(500).send("Failed to connect to DB or execute query");
  }
};

module.exports = {
  allUsers,
};
