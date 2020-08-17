const { MongoClient, Db } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercise_1");

  const data = await db.collection("users").find().toArray();

  const users = await data;

  client.close();

  users !== []
    ? res.status(200).json(users)
    : res.status(404).json("Couldn't find any user, 404");
};

module.exports = { getUsers };
