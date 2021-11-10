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
        const game =  await getGameById(req.params.id);
        if(!game) return res.status(404).json({error: "Not found"});

        const result =  await updateGame(req.body);
        res.json({ status: result.statusCode, updatedProperties: req.body });
    }
    catch (error){
        res.status(500).json([]);
    }

  });

export default router;