const assert = require("assert");

const { MongoClient, Db } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const newGreeting = req.body;
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("exercise_1");
    const collection = db.collection("greetings");

    await collection.insertOne({ newGreeting });

    const data = await collection.find({ newGreeting }).toArray();

    const greeting = await data;

    res.status(201).json(greeting);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

module.exports = { createGreeting };
