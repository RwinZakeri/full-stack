const { ObjectId } = require("mongodb");
const ConnectToDB = require("../utils/mongoDbConnetion");

const findAllTodos = async () => {
  const db = await new ConnectToDB().Get();
  const collection = await db.collection("todos").find({}).toArray();
  return collection;
  //   return new Promise(async (resolve, reject) => {
  //     const collection = await db.collection("todos").find({}).toArray();
  //     resolve(collection);
  //   });
};

const insertOneItem = async (data) => {
  const db = await new ConnectToDB().Get();
  const collection = await db.collection("todos").insertOne(JSON.parse(data));
  return { status: collection.acknowledged };
};

const deleteItem = async (id) => {
  const db = await new ConnectToDB().Get();
  const res = await db.collection("todos").deleteOne({ _id: new ObjectId(id) });

  return res;
};

const findItem = async (id) => {
  const db = await new ConnectToDB().Get();
  const collection = await db.collection("todos");

  const dbResponse = await collection.findOne({
    _id: new ObjectId(id),
  });

  return dbResponse;
};

const updateItem = async (id, data) => {
  const db = await new ConnectToDB().Get();
  const collection = await db.collection("todos");
  const dbResponse = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
};

const dbFunc = {
  findAllTodos,
  insertOneItem,
  deleteItem,
  updateItem,
  findItem,
};

module.exports = dbFunc;
