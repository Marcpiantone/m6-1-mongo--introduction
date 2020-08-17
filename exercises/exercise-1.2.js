const { MongoClient, Db } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName, collection) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db(dbName);

  const data = await db.collection(collection).find().toArray();
  client.close();

  return data;
};

const users = getCollection("exercise_1", "users").then((data) =>
  console.log(data)
);
