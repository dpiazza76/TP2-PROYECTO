import { ObjectId } from "bson";
import getConnection from "./mongo.js";

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

async function getUserByEmail(email) {
  const clientMongo = await getConnection();
  const usuario = clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .findOne({ email: email });
  return usuario;
}

async function getUserById(id) {
  const clientMongo = await getConnection();
  const usuario = clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .findOne({ _id: new ObjectId(id) });
  return usuario;
}

async function addUser(usuario) {
  const clientMongo = await getConnection();
  const result = clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .insertOne(usuario);
  return result;
}

async function updateUser(usuario) {
  const clientMongo = await getConnection();
  const query = { _id: new ObjectId(usuario._id) };
  const newValues = {
    $set: {
      nombre: usuario.nombre,
    },
  };

  const result = await clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .updateOne(query, newValues);
  return result;
}

async function deleteUser(id) {
  const clientMongo = await getConnection();
  const result = await clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .deleteOne({ _id: new ObjectId(id) });
  return result;
}

export {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
};
