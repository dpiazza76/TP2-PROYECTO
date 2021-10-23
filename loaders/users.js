import { ObjectId } from "bson";
import { getConnection } from "./mongo.js";

const BD1 = "base1";
const COLLECTION_USUARIOS = "usuarios";

async function getUsers() {
  const clientMongo = await getConnection();
  const usuarios = clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .find()
    .toArray();
  return usuarios;
}

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

export { addUser, getUsers };
