// configs
const { PORT, http } = require("./configs/config");
// controllers
const NotFound = require("./controller/notFound.controller");
const { userById } = require("./controller/auth.controller");
// server
const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/users" && method === "GET") {
    userById(req, res);
  }

  NotFound(req, res);
});

// listen server
server.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`);
});
