const { ObjectId } = require("mongodb");
const dbInstance = require("../configs/db.connect");

const insertOneTodo = async (token, data) => {
  const db = await dbInstance.getDb();
  const collection = await db.collection("todos");

  const addTodo = await collection.insertOne({
    title: data.title,
    description: data.description,
    isDone: false,
    authorID: token,
  });

  // Fetch the inserted todo using the insertedId
  const insertedTodo = await collection.findOne({ _id: addTodo.insertedId });

  return insertedTodo;
};

// const findTodo = async (id) => {
//   const db = await dbInstance.getDb();
//   const collection = await db.collection("todos");
//   const findTodo = await collection.find({ _id: new ObjectId(id) }).toArray();
//   console.log(findTodo);
//   return findTodo;
// };

const findTodo = async (id) => {
  const db = await dbInstance.getDb();
  const collection = await db.collection("todos");
  const findTodo = await collection.find({ authorID: id }).toArray(); // Assumes _id is the user's id
  console.log(findTodo);
  return findTodo;
};

const deleteOneTodo = async (id) => {
  console.log(id);
  const db = await dbInstance.getDb();
  const collection = await db.collection("todos");

  if (id) {
    const deletedResponse = await collection.deleteOne({
      _id: new ObjectId(id),
    });
    return deletedResponse.deletedCount;
  } else {
    const deletedResponse = await collection.deleteMany({});
    return deletedResponse.deletedCount;
  }
};

module.exports = {
  insertOneTodo,
  findTodo,
  deleteOneTodo,
};
