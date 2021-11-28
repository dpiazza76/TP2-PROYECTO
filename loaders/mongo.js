import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let instance = null;

async function getConnection() {
  if (instance == null) {
    instance = await client.connect();
  }
  return instance;
}

export default getConnection;
