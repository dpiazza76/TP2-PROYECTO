import { ObjectId } from "bson";
import getConnection from "./mongo.js";
import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
import axios from "axios";

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

async function getRanking() {
  const clientMongo = await getConnection();
  const usuarios = await getUsers();
  return usuarios.sort(
    (a, b) =>
      b.gamesStatistics.snake.maxScore - a.gamesStatistics.snake.maxScore
  );
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
      fullname: usuario.fullname,
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
  const isMatch = await bcrypt.compare(password, user.password);

  return isMatch ? user : undefined;
}

async function login(email, password) {
  let user = findByCredential(email, password);
  let token = undefined;

  if (user) {
    token = await generateAuthToken(user);
  }
  user.token = token;
  return user;
}

async function generateAuthToken(user) {
  const token = pkg.sign({ _id: user._id }, process.env.KEY, {
    expiresIn: "4h",
  });
  return token;
}

async function getGoogleUserByToken(accessToken) {
  const usuario = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  );
  return usuario;
}

async function getUserGame(gameId, userId) {
  const user = await getUserById(userId);
  const { gamesStatistics } = user;
  const valores = Object.values(gamesStatistics);
  const juegoBuscado = valores.filter((juego) => juego.id === gameId);

  return juegoBuscado[0];
}

async function updateFav(userId) {
  let user = await getUserById(userId);

  const clientMongo = await getConnection();
  const query = { _id: new ObjectId(userId) };
  let fav = !user.gamesStatistics.snake.isFav;
  const newValues = {
    $set: {
      "gamesStatistics.snake.isFav": fav,
    },
  };
  const result = await clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .updateOne(query, newValues);
  return result;
}

async function updateUserGame(game, userId) {
  let user = await getUserById(userId);
  let maxscore2 = user.gamesStatistics.snake.maxScore;
  let timessum = user.gamesStatistics.snake.timesPlayed + 1;

  if (maxscore2 < game.maxScore) {
    maxscore2 = game.maxScore;
  }

  const clientMongo = await getConnection();
  const query = { _id: new ObjectId(userId) };
  const newValues = {
    $set: {
      "gamesStatistics.snake.maxScore": maxscore2,
      "gamesStatistics.snake.timesPlayed": timessum,
    },
  };

  const result = await clientMongo
    .db(BD1)
    .collection(COLLECTION_USUARIOS)
    .updateOne(query, newValues);
  return result;
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
  getGoogleUserByToken,
  getUserGame,
  updateUserGame,
  updateFav,
  getRanking,
  login,
};
