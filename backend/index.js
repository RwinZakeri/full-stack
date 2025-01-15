const { PORT, http } = require("./configs/config");
const NotFound = require("./controller/notFound.controller");
const {
  allUsers,
  addUsers,
  removeUser,
  removeAllUser,
  loginUser,
  checkToken,
} = require("./controller/auth.controller");
const {
  addTodo,
  GetTodos,
  deleteTodo,
  deleteAllTodo,
  updateTodo,
} = require("./controller/todo.controller");

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-domain.com",
];

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;

  // CORS headers
  const origin = headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, token"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Route handling
  const GET = method === "GET";
  const POST = method === "POST";
  const PATCH = method === "PATCH";
  const DELETE = method === "DELETE";

  const users = url === "/users";
  const userIdRegex = /^\/users\/([a-fA-F0-9]{24})$/;
  const login = url === "/login";
  const todo = url === "/todo";
  const todoIdRegex = /^\/todo\/([a-fA-F0-9]{24})$/;
  const isUserExist = url === "/isexist";

  if (users && GET) {
    allUsers(req, res);
  } else if (users && POST) {
    addUsers(req, res);
  } else if (users && DELETE) {
    removeAllUser(req, res);
  } else if (userIdRegex.test(url) && DELETE) {
    removeUser(req, res);
  } else if (login && POST) {
    loginUser(req, res);
  } else if (todo && POST) {
    addTodo(req, res);
  } else if (todo && GET) {
    GetTodos(req, res);
  } else if (todoIdRegex.test(url) && DELETE) {
    deleteTodo(req, res);
  } else if (todoIdRegex.test(url) && PATCH) {
    updateTodo(req, res);
  } else if (isUserExist && GET) {
    checkToken(req, res);
  } else {
    NotFound(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
