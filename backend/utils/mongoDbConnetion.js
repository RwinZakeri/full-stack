const { MongoClient } = require("mongodb");

module.exports = class ConnectToDB {
  #DB_URI = "mongodb://localhost:27017";
  #DB = null;

  async connect() {
    const client = new MongoClient(this.#DB_URI);
    const db = client.db("mongodb-rwin");
    return db;
  }

  async Get() {
    if (this.#DB) {
      console.log("Connection already exists");
      return this.#DB;
    } else {
      console.log("Connected to DB");
      this.#DB = await this.connect();
      return this.#DB;
    }
  }
};
