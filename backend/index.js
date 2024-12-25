const http = require("http");
const {
  getAllTodos,
  AddOneTodo,
  removeTodo,
  findTodo,
  updateTodo,
} = require("./controller/todos.controller");

const serverPort = "3001";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  const { method, url } = req;
  if (url === "/todos" && method === "GET") {
    getAllTodos(req, res);
  } else if (url === "/todos" && method === "POST") {
    AddOneTodo(req, res);
  } else if (url.match(/^\/todos\/[a-zA-Z0-9]+$/) && method === "DELETE") {
    console.log("deleted");
    removeTodo(req, res);
  } else if (url.match(/^\/todos\/[a-zA-Z0-9]+$/) && method === "POST") {
    updateTodo(req, res);
  } else if (url.match(/^\/todos\/[a-zA-Z0-9]+$/) && method === "GET") {
    findTodo(req, res);
  } else {
    res.write("not found");
    res.end();
  }
});

server.listen(serverPort, async () => {
  console.log(`backend run on http://localhost:${serverPort}`);
});
