const { MongoClient, Db } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const newUser = req.body;

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");

  await db.collection("users").insertOne({ newUser });

  const data = await db.collection("users").find({ newUser }).toArray();

  const user = await data;

  client.close();

  res.status(201).json(user);
};

module.exports = { addUser };
