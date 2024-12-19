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

const dbFunc = {
  findAllTodos,
  insertOneItem,
};

module.exports = dbFunc;
