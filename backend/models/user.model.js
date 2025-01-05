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

const insertOneUser = async (data) => {
  try {
    const db = await dbInstance.getDb();
    const collection = db.collection("users");
    const dbInsertResponse = await collection.insertOne(data);

    const insertResposen = await collection.findOne(
      {
        _id: dbInsertResponse.insertedId,
      },
      { projection: { userName: 1, email: 1, _id: 1 } }
    );

    return insertResposen;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAll,
  insertOneUser,
};
