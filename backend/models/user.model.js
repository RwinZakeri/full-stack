const { ObjectId } = require("mongodb");
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

    const existingUser = await collection.findOne(
      { $or: [{ email: data.email }, { userName: data.userName }] },
      { projection: { userName: 1, email: 1, _id: 1 } }
    );

    if (existingUser) {
      return { message: "User already exists", user: existingUser };
    }

    const dbInsertResponse = await collection.insertOne(data);

    const insertedUser = await collection.findOne(
      { _id: dbInsertResponse.insertedId },
      { projection: { userName: 1, email: 1, _id: 1 } }
    );

    return insertedUser;
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    const db = await dbInstance.getDb(); // Assume dbInstance provides the MongoDB connection
    const collection = db.collection("users");

    // Perform the delete operation
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result; // Return the MongoDB delete result
  } catch (error) {
    console.error("Error in deleteOne:", error);
    throw new Error("Database error while deleting user");
  }
};

const deleteAll = async () => {
  try {
    const db = await dbInstance.getDb();
    const collection = db.collection("users");

    // Delete all documents from the collection
    const result = await collection.deleteMany({});

    return result; // Return the deleteMany result
  } catch (error) {
    console.error("Error in deleteAll:", error);
    throw new Error("Database error while deleting all users");
  }
};

const isExistUser = async (data) => {

  const db = await dbInstance.getDb();
  const collection = await db.collection("users");
  const dbUserData = await collection.findOne({
    userName: data.userName,
    password: data.password,
  });

  return dbUserData;
};

// const loginUser =

module.exports = {
  findAll,
  insertOneUser,
  deleteOne,
  deleteAll,
  isExistUser,
};
