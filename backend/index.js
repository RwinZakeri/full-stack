// configs
const { PORT, http } = require("./configs/config");
// controllers
const NotFound = require("./controller/notFound.controller");
const { allUsers, addUsers } = require("./controller/auth.controller");
// server
const server = http.createServer((req, res) => {
  const { url, method } = req;
  // methods variable
  const GET = method === "GET";
  const POST = method === "POST";
  // routes variable
  const users = url + "/users";

  if (users && GET) {
    allUsers(req, res);
  } else if (users && POST) {
    addUsers(req, res);
  } else {
    NotFound(req, res);
  }
});

// listen server
server.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`);
});
