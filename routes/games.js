import { getGameById, getGames, updateGame } from "../loaders/games.js";
import express from "express";

const router = express.Router();

router.get("/", async function (req, res, next) {
    const games = await getGames();
    res.send(games);
});

router.get("/:gameId", async (req, res) => {
    const game = await getGameById(req.params.gameId)
    res.send(game);
  });

  //corregir si mando un id invalido por el param, que me devuelva error
  //también si le mando un id invalido en el objeto JSON me dice como q lo actualiza pero no lo actualizo
router.post("/update/:id", async (req, res, next) => {
    try{
        const game = getGameById(req.params.id);
        const result = updateGame(req.body);
        res.json({ status: result.statusCode, updatedProperties: req.body });
    }
    catch{
        res.json({ error: "Juego no encontrado" });
    }

  });

export default router;