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

const patchTodo = async (id, data) => {
  try {
    const db = await dbInstance.getDb();
    const collection = db.collection("todos");

    // Ensure the `data` parameter contains valid update fields
    const updateResponse = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (updateResponse.matchedCount === 0) {
      console.log(`No todo found with id: ${id}`);
    } else if (updateResponse.modifiedCount > 0) {
      console.log(`Todo with id: ${id} updated successfully.`);
    } else {
      console.log(`Todo with id: ${id} was not modified.`);
    }

    return updateResponse.matchedCount;
  } catch (error) {
    console.error(`Failed to update todo with id: ${id}`, error);
    throw error;
  }
};

module.exports = {
  insertOneTodo,
  findTodo,
  deleteOneTodo,
  patchTodo,
};
