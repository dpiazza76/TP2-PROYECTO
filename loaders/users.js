import { ObjectId } from "bson";
import getConnection from "./mongo.js";
import bcryptjs from "bcryptjs";
import pkg from "jsonwebtoken";

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
  usuario.password = await bcrypt.hash(usuario.password, 8);

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

async function findByCredential(email, password) {
  const clientMongo = await getConnection();
  const user = await clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .findOne({ email: email });
  if (!user) {
    throw new Error("Credenciales no validas");
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales no validas");
  }
  return user;
}

async function generateAuthToken(user) {
  const token = pkg.sign({ _id: user._id }, process.env.KEY, {
    expiresIn: "4h",
  });
  return token;
}

export {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  generateAuthToken,
  findByCredential,
};
