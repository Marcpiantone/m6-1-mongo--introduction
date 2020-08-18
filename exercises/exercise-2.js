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

    const r = await collection.insertOne(newGreeting);
    assert.equal(1, r.insertedCount);

    const data = await collection.find(newGreeting).toArray();

    res.status(201).json({ status: 201, data: data });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const getGreeting = async (req, res) => {
  const _id = req.params._id.toUpperCase();
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");

  await db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const query = req.query;

  const start = Number(query.start) - 1;
  const limit = Number(query.limit);

  console.log({ start, limit });

  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");

  await db
    .collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result !== []) {
        const actualStart = start ? start : 0;
        const actualEnd = limit ? actualStart + limit : result.length;
        const data = result.slice(actualStart, actualEnd);
        res.status(200).json({
          status: 200,
          start: actualStart,
          limit: actualEnd,
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          data: "Not Found",
        });
      }
      client.close();
    });
};

const deleteGreeting = async (req, res) => {
  const _id = req.params._id.toUpperCase();

  console.log(_id);
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");

  await db.collection("greetings").deleteOne({ _id }, (err, result) => {
    if (result && result.deletedCount === 1) {
      res
        .status(200)
        .json({ status: 204, _id, data: "Entry succesfully deleted" });
    } else {
      res.status(404).json({ status: 404, _id, data: "Not Found" });
    }

    client.close();
  });
};
module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting };
