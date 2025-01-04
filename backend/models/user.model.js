const dbInstance = require("../configs/db.connect");

const findAll = async () => {
  try {
    await dbInstance.connect();
    const db = dbInstance.getDb();
    const collection = db.collection("rwin-todos");

    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
};
