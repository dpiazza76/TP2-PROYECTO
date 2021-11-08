import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const instance = null;

async function getConnection() {
  if (instance == null) {
    instance = client.connect();
  }
  return instance;
}

export default getConnection;
