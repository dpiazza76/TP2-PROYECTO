import { getGameById, getGames, updateGame } from "../loaders/games.js";
import express from "express";

const router = express.Router();

//#region swagger
/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Retrieve the current list of games available in the app
 *     description: Retrieve the current list of games available in the app. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     responses:
 *        200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The game ID.
 *                         example: 618b328ecaa87bef9064528a
 *                       nombre:
 *                         type: string
 *                         description: The games's name.
 *                         example: Snake
 *                       puntajeMax:
 *                          type: integer
 *                          description: The game's max score.
 *                          example: 15
 *                       idUsuarioMax:
 *                          type: string
 *                          description: Id for the user which got the max score in the given game.
 *                          example: 618b328ecaa87bef9064528a
 *                       vecesJugado:
 *                          type: integer,
 *                          description: The game's amount of times its been played.
 *                          example: 10
 */
//#endregion

router.get("/", async function (req, res, next) {
  try {
    const games = await getGames();
    res.send(games);
  } catch (error) {
    res.status(500).json([]);
  }
});

//#region swagger
/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Retrieve a single game available in the app
 *     description: Retrieve a single game available in the app. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: String ID of the game to retrieve.
 *              schema:
 *                type: string
 *     responses:
 *       200:
 *         description: A single game.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       _id:
 *                         type: string
 *                         description: The game ID.
 *                         example: 618b328ecaa87bef9064528a
 *                       nombre:
 *                         type: string
 *                         description: The games's name.
 *                         example: Snake
 *                       puntajeMax:
 *                          type: integer
 *                          description: The game's max score.
 *                          example: 15
 *                       idUsuarioMax:
 *                          type: string
 *                          description: Id for the user which got the max score in the given game.
 *                          example: 618b328ecaa87bef9064528a
 *                       vecesJugado:
 *                          type: integer,
 *                          description: The game's amount of times its been played.
 *                          example: 10
 */
//#endregion

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(400).json([]);
  try {
    const game = await getGameById(id);
    res.json(game);
  } catch (error) {
    res.status(500).json([]);
  }
});

//#region swagger
/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Updates a single game available in the app
 *     description: Updates a single game available in the app. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: String ID of the game to update.
 *              schema:
 *                type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                       puntajeMax:
 *                          type: integer
 *                          description: The game's max score.
 *                          example: 15
 *                       idUsuarioMax:
 *                          type: string
 *                          description: Id for the user which got the max score in the given game.
 *                          example: 618b328ecaa87bef9064528a
 *                       vecesJugado:
 *                          type: integer,
 *                          description: The game's amount of times its been played.
 *                          example: 10
 *     responses:
 *       200:
 *         description: A single updated game.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       _id:
 *                         type: string
 *                         description: The game ID.
 *                         example: 618b328ecaa87bef9064528a
 *                       nombre:
 *                         type: string
 *                         description: The games's name.
 *                         example: Snake
 *                       puntajeMax:
 *                          type: integer
 *                          description: The game's max score.
 *                          example: 15
 *                       idUsuarioMax:
 *                          type: string
 *                          description: Id for the user which got the max score in the given game.
 *                          example: 618b328ecaa87bef9064528a
 *                       vecesJugado:
 *                          type: integer,
 *                          description: The game's amount of times its been played.
 *                          example: 10
 */
//#endregion


router.put("/:id", async (req, res, next) => {
  try {
    const game = await getGameById(req.params.id);
    if (!game) return res.status(404).json({ error: "Not found" });

    const result = await updateGame(req.body);
    res.json({ status: result.statusCode, updatedProperties: req.body });
  } catch (error) {
    res.status(500).json([]);
  }
});

export default router;
