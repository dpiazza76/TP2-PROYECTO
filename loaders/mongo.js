import dotenv from "dotenv";
import mongoose from 'mongoose';


dotenv.config();

const getConnection = async () => {
  try {
    // get the mongoose client to connect to the db
    const client = await mongoose.connect(
      process.env.MONGODB, { useNewUrlParser: true });
    // get the mongo connection and return it to further use
    return client.connection.db;
  } catch (err) {
    console.error(err);
  }
}


export default getConnection;
