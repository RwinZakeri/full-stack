const dbInstance = require("../configs/db.connect");

const findAll = async () => {
  try {
    const db = await dbInstance.getDb();
    const collection = db.collection("users");
    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
};
