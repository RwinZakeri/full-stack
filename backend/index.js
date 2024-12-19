const http = require("http");
const { getAllTodos, AddOneTodo } = require("./controller/todos.controller");

// server port
const serverPort = "3000";
const server = http.createServer((req, res) => {
  // base config
  res.writeHead(200, { "content-type": "application/json" });
  const { method, url } = req;
  if (url === "/todos" && method === "GET") {
    getAllTodos(req, res);
  } else if (url === "/todos" && method === "POST") {
    AddOneTodo(req, res);
  }
});

server.listen(serverPort, async () => {
  console.log(`backend run on http://localhost:${serverPort}`);
});
