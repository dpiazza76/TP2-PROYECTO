import { ObjectId } from "bson";
import { getConnection } from "./mongo.js";

const BD1 = "base1";
const COLLECTION_USUARIOS = "usuarios";

function getUsers() {}

function getUserbyEmail(email) {}

async function addUser(usuario) {
  const clientMongo = await getConnection();
  const result = clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .insertOne(usuario);
  return result;
}

function updateUser() {}

function deleteUser() {}

export { addUser };
