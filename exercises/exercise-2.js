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

    const r = await db.collection("greetings").insertOne({ newGreeting });
    assert.equal(1, r.insertedCount);

    const data = await collection.find({ newGreeting }).toArray();

    res.status(201).json({ status: 201, data: data });
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

module.exports = { createGreeting };
