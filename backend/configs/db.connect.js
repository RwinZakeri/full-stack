const { MongoClient } = require("mongodb");
const { DBURL } = require("./config");

class ConnectToDB {
  constructor() {
    if (ConnectToDB.instance) {
      return ConnectToDB.instance;
    }
    ConnectToDB.instance = this;
  }

  #db = null;

  async connect() {
    if (this.#db) {
      console.log("Reusing existing database connection.");
      return this.#db;
    }

    try {
      const client = await MongoClient.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.#db = client.db("rwin-todo"); // Replace "rwin-todo" with your database name
      console.log("Connected to DB successfully.");
      return this.#db;
    } catch (err) {
      console.error("Error connecting to database:", err);
      throw err;
    }
  }

  getDb() {
    if (!this.#db) {
      throw new Error("Database not connected. Call `connect` first.");
    }
    return this.#db;
  }
}

// Export a single instance of the class
const dbInstance = new ConnectToDB()
module.exports = dbInstance;
