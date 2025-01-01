require("dotenv").config();
const http = require("http");
const PORT = process.env.SERVER_PORT;
const DBURL = process.env.DB_URL;

module.exports = { PORT, http, DBURL };
