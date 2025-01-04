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

  async #connect() {
    try {
      const client = await MongoClient.connect(DBURL, {
        useUnifiedTopology: true,
        maxPoolSize: 10,
      });
      this.#db = client.db();
      console.log("Connected to DB successfully.");
      return this.#db;
    } catch (err) {
      console.error("Error connecting to database:", err);
      throw err;
    }
  }

  async getDb() {
    if (!this.#db) {
      await this.#connect();
    }
    console.log("use existing connection");
    return this.#db;
  }
}

// Export a single instance of the class
const dbInstance = new ConnectToDB();
module.exports = dbInstance;
