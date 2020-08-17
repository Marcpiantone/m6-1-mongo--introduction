const { fs } = require("file-system");
const assert = require("assert");
const { MongoClient, Db } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));
const batchImport = async (data) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercise_1");
    const collection = db.collection("greetings");

    const r = await collection.insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);

    console.log(r);
  } catch (err) {
    console.log(err);
  }
};

batchImport(greetings);
