const dbInstance = require("../configs/db.connect");

const userById = async (req, res) => {
  const connect = await dbInstance.connect();
  const db = await dbInstance.getDb();
  
  
  res.end("test");
};

module.exports = {
  userById,
};
