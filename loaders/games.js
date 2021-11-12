import { ObjectId } from "bson";
import getConnection from "./mongo.js";

const BD1 = "base1";
const COLLECTION_JUEGOS = "juegos";

async function getGames() {
    const clientMongo = await getConnection();
    const games = clientMongo
      .db(BD1)
      .collection(COLLECTION_JUEGOS)
      .find()
      .toArray();
    return games;
}

async function getGameById(id) {
    const clientMongo = await getConnection();
    const game = clientMongo
      .db(BD1)
      .collection(COLLECTION_JUEGOS)
      .findOne({ _id: new ObjectId(id) });
    return game;
}

async function getGameByCode(code){
  const clientMongo = await getConnection();
  const game = clientMongo
              .db(BD1)
              .collection(COLLECTION_JUEGOS)
              .findOne({"gameCode": code});
    return game;
}

async function updateGame(game) {
    const clientMongo = await getConnection();
    const query = { _id: new ObjectId(game._id) };
    const newValues = {
      $set: {
            puntajeMax: game.puntajeMax,
            idUsuarioMax: game.idUsuarioMax,
            vecesJugado: game.vecesJugado,
        },
    };
    const result = await clientMongo
                            .db(BD1)
                            .collection(COLLECTION_JUEGOS)
                            .updateOne(query, newValues);
    return result;
}



  export { getGameById, getGames, updateGame, getGameByCode };