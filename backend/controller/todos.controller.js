const dbFunc = require("../model/todo.model");

const getAllTodos = async (req, res) => {
  const allTodos = await dbFunc.findAllTodos();
  res.write(JSON.stringify(allTodos));
  res.end();
};

const AddOneTodo = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const dbReponse = dbFunc.insertOneItem(body);
    res.write(JSON.stringify(await dbReponse));
    res.end();
  });
};

const TodosControllers = {
  getAllTodos,
  AddOneTodo,
};

module.exports = TodosControllers;
