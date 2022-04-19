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
Connection.url =
  "mongodb+srv://demo:demo123@cluster0.ajcsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
Connection.options = {
  useUnifiedTopology: true,
};

module.exports = { Connection };
