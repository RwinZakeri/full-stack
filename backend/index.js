// configs
const { PORT, http } = require("./configs/config");
// controllers
const NotFound = require("./controller/notFound.controller");
const {
  allUsers,
  addUsers,
  removeUser,
  removeAllUser,
  loginUser,
} = require("./controller/auth.controller");
// server
const server = http.createServer((req, res) => {
  const { url, method } = req;
  // methods variable
  const GET = method === "GET";
  const POST = method === "POST";
  const DELETE = method === "DELETE";
  // routes variable
  const users = url === "/users";
  const userIdRegex = /^\/users\/([a-fA-F0-9]{24})$/;
  const login = url === "/users" + "/login";
  console.log(login);

  if (users && GET) {
    allUsers(req, res);
  } else if (users && POST) {
    addUsers(req, res);
  } else if (users && DELETE) {
    removeAllUser(req, res);
  } else if (userIdRegex.test(url) && DELETE) {
    removeUser(req, res);
  } else if (login && POST) {
    loginUser(req , res);

  } else {
    NotFound(req, res);
  }
});

// listen server
server.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`);
});
