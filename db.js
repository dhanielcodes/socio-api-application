const { MongoClient } = require("mongodb");
const ip = require("ip");
const chalk = require('cli-color');

const dotenv = require("dotenv");
dotenv.config();
const { PORT, CONNECTION_STRING } = process.env;
const local = 'http://' + 'localhost' + ':' + PORT
const newtWork = 'http://' + ip.address() + ':' + PORT
const connectDb = async () => {
  const db = new MongoClient(CONNECTION_STRING);
  await db.connect();
  module.exports = db;
  const app = require("./app");
  app.listen(PORT);
  console.group()
  console.log('> Listen on Local ' + chalk.blue(local));
  console.log('> Listen on Network ' + chalk.blue(newtWork));

};
connectDb();
