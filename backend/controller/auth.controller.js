const { MongoClient } = require("mongodb");
const { findAll } = require("../models/user.model");

const allUsers = async (req, res) => {
  try {
    const modelResponse = await findAll();

    res.writeHead(200, { "Content-Type": "application/json" });

    res.write(JSON.stringify(modelResponse));
    res.end();
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write({ error: err });
    res.end();
  }
};

module.exports = {
  allUsers,
};
