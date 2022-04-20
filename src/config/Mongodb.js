/** @format */

const MongoClient = require("mongodb").MongoClient;

class Connection {
  static async open() {
    if (this.db) return this.db;
    this.db = await MongoClient.connect(this.url, this.options);

    this.db = this.db.db("TaskTracker");
    return this.db;
  }
}

Connection.db = null;
Connection.url = process.env.MONGODB_URL;
Connection.options = {
  useUnifiedTopology: true,
};

module.exports = { Connection };
