import {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  getGoogleUserByToken,
  generateAuthToken,
  getRanking,
  login,
} from "../loaders/users.js";

import { auth } from "../middleware/auth.js";

import express from "express";
const SNAKE_ID = "618b328ecaa87bef9064528a";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve the current list of users available in the app
 *     description: Retrieve the current list of users available in the app. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     responses:
 *        200:
 *         description: A list of users.
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
 *                         description: The user ID.
 *                         example: 6196c74ebe95d35950423176
 *                       fullname:
 *                         type: string
 *                         description: The user's full name.
 *                         example: Turincho
 *                       email:
 *                          type: string
 *                          description: The users's email.
 *                          example: joaquin.soriano@hotmail.com
 *                       password:
 *                          type: string
 *                          description: Encripted password for the given user.
 *                          example: $2a$08$zRdKdNCjtEO0WiqneLzI1uCMPxlDgX4.XX7pIvutAuFX
 *                       gamesStatistics:
 *                          type: object
 *                          properties:
 *                             snake:
 *                               type: object
 *                               properties:
 *                                  maxScore:
 *                                    type: integer
 *                                    description: Game's max score.
 *                                    example: 0
 *                                  isFav:
 *                                    type: boolean
 *                                    description: Indicates if the game is faved by the user.
 *                                    example: false
 *                                  timesPlayed:
 *                                    type: integer
 *                                    description: Indicates the amount of times the player opened and played the game.
 *                                    example: 0
 */
router.get("/", async function (req, res, next) {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    res.status(500).json([]);
  }
});

/**
 * @swagger
 * /api/users/ranking:
 *   get:
 *     summary: Retrieve the current list of users sorted by their scores in the games.
 *     description: Retrieve the current list of users sorted by their scores in the games.. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     responses:
 *        200:
 *         description: A list of users sorted by their scores.
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
 *                         description: The user ID.
 *                         example: 6196c74ebe95d35950423176
 *                       fullname:
 *                         type: string
 *                         description: The user's full name.
 *                         example: Turincho
 *                       email:
 *                          type: string
 *                          description: The users's email.
 *                          example: joaquin.soriano@hotmail.com
 *                       password:
 *                          type: string
 *                          description: Encripted password for the given user.
 *                          example: $2a$08$zRdKdNCjtEO0WiqneLzI1uCMPxlDgX4.XX7pIvutAuFX
 *                       gamesStatistics:
 *                          type: object
 *                          properties:
 *                             snake:
 *                               type: object
 *                               properties:
 *                                  maxScore:
 *                                    type: integer
 *                                    description: Game's max score.
 *                                    example: 0
 *                                  isFav:
 *                                    type: boolean
 *                                    description: Indicates if the game is faved by the user.
 *                                    example: false
 *                                  timesPlayed:
 *                                    type: integer
 *                                    description: Indicates the amount of times the player opened and played the game.
 *                                    example: 0
 */
router.get("/ranking", auth, async function (req, res, next) {
  try {
    const users = await getRanking();
    res.send(users);
  } catch (error) {
    res.status(500).json([]);
  }
});

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Retrieve a single user by email
 *     description: Retrieve a single user by email. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     parameters:
 *            - in: query
 *              name: email
 *              required: true
 *              description: String email of the user to retrieve.
 *              schema:
 *                type: string
 *     responses:
 *       200:
 *         description: A single user.
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
 *                         description: The user ID.
 *                         example: 6196c74ebe95d35950423176
 *                       fullname:
 *                         type: string
 *                         description: The user's full name.
 *                         example: Turincho
 *                       email:
 *                          type: string
 *                          description: The users's email.
 *                          example: joaquin.soriano@hotmail.com
 *                       password:
 *                          type: string
 *                          description: Encripted password for the given user.
 *                          example: $2a$08$zRdKdNCjtEO0WiqneLzI1uCMPxlDgX4.XX7pIvutAuFX
 *                       gamesStatistics:
 *                          type: object
 *                          properties:
 *                             snake:
 *                               type: object
 *                               properties:
 *                                  maxScore:
 *                                    type: integer
 *                                    description: Game's max score.
 *                                    example: 0
 *                                  isFav:
 *                                    type: boolean
 *                                    description: Indicates if the game is faved by the user.
 *                                    example: false
 *                                  timesPlayed:
 *                                    type: integer
 *                                    description: Indicates the amount of times the player opened and played the game.
 *                                    example: 0
 */
router.get("/search", auth, async (req, res, next) => {
  let email = req.query.email;
  if (!email) return res.status(400).json([]);

  try {
    const user = await getUserByEmail(req.query.email);
    if (!user) return res.status(400).json([]);

    res.json(user);
  } catch (error) {
    res.status(500).json([]);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a single user by id
 *     description: Retrieve a single user by id. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: String id of the user to retrieve.
 *              schema:
 *                type: string
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       _id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 6196c74ebe95d35950423176
 *                       fullname:
 *                         type: string
 *                         description: The user's full name.
 *                         example: Turincho
 *                       email:
 *                          type: string
 *                          description: The users's email.
 *                          example: joaquin.soriano@hotmail.com
 *                       password:
 *                          type: string
 *                          description: Encripted password for the given user.
 *                          example: $2a$08$zRdKdNCjtEO0WiqneLzI1uCMPxlDgX4.XX7pIvutAuFX
 *                       gamesStatistics:
 *                          type: object
 *                          properties:
 *                             snake:
 *                               type: object
 *                               properties:
 *                                  maxScore:
 *                                    type: integer
 *                                    description: Game's max score.
 *                                    example: 0
 *                                  isFav:
 *                                    type: boolean
 *                                    description: Indicates if the game is faved by the user.
 *                                    example: false
 *                                  timesPlayed:
 *                                    type: integer
 *                                    description: Indicates the amount of times the player opened and played the game.
 *                                    example: 0
 */
router.get("/:id", auth, async (req, res, next) => {
  let id = req.params.id;
  let user = undefined;
  try {
    user = await getUserById(id);
    if (user == null) throw new Error("User not found!");
  } catch (ex) {
    res.status(404).json({ error: ex.message });
  }
  res.json(user);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Adds a single user
 *     description: Adds a single user. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                       email:
 *                          type: string
 *                          description: The users's email.
 *                          example: joaquin1.soriano@hotmail.com
 *                       password:
 *                          type: string
 *                          description: Password for the given user.
 *                          example: pass123
 *                       _id:
 *                          type: string
 *                          description: The user ID.
 *                          example: 61a4f2b0e3b0cc9a011ac864
 *     responses:
 *       200:
 *         description: Single added user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       email:
 *                          type: string
 *                          description: The users's email.
 *                          example: joaquin1.soriano@hotmail.com
 *                       password:
 *                          type: string
 *                          description: Encripted password for the given user.
 *                          example: $2a$08$zRdKdNCjtEO0WiqneLzI1uCMPxlDgX4.XX7pIvutAuFX
 *                       _id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 61a4f2b0e3b0cc9a011ac864
 */
router.post("/",  async (req, res, next) => {
  try {
    // Chequing non existance of user
    if (await getUserByEmail(req.body.email))
      return res.json({ error: "Email ya existente" });

    const user = req.body;
    const result = await addUser(user);
    res.json({ status: result.statusCode, user: user });
  } catch (error) {
    res.status(500).json([]);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a single user username and/or password by id
 *     description: Update a single user username and/or password. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: String id of the user to retrieve.
 *              schema:
 *                type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                       fullname:
 *                          type: string
 *                          description: The users's fullname.
 *                          example: Turincho
 *                       password:
 *                          type: string
 *                          description: Password for the given user.
 *                          example: pass123
 *                       _id:
 *                          type: string
 *                          description: The user ID.
 *                          example: 6196c74ebe95d35950423176
 *     responses:
 *       200:
 *         description: Update a single user username and/or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  updatedProperties:
 *                    type: object
 *                    properties:
 *                       fullname:
 *                         type: string
 *                         description: The user's full name.
 *                         example: Turincho
 *                       password:
 *                          type: string
 *                          description: Encripted password for the given user.
 *                          example: $2a$08$zRdKdNCjtEO0WiqneLzI1uCMPxlDgX4.XX7pIvutAuFX
 *                       _id:
 *                          type: string
 *                          description: The user ID.
 *                          example: 6196c74ebe95d35950423176
 */
router.put("/:id", auth, async (req, res, next) => {
  let id = req.params.id;
  let user = undefined;
  try {
    user = await getUserById(id);
    //Chequing existance of user
    if (user == null) throw new Error("User not found!");

    const result = await updateUser(id, req.body);
    res.json({ status: result.statusCode, updatedProperties: req.body });
  } catch (error) {
    res.status(500).json({ error: "User not found!" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a single user by id
 *     description: Delete a single user by id. Can be used to consume in a client as it serves all the data to implement in a frontend.
 *     parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: String id of the user to retrieve.
 *              schema:
 *                type: string
 *     responses:
 *       200:
 *         description: Delete a single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: integer
 *                   example: 200
 *                 result:
 *                   type: object
 *                   properties: 
 *                     acknowledged:
 *                      type: boolean
 *                      example: true
 *                     deletedCount:
 *                      type: integer
 *                      example: 1
 */
router.delete("/:id", auth, async (req, res, next) => {
  let id = req.params.id;
  let result = undefined;
  try {
    result = await deleteUser(id);
  } catch (error) {
    res.status(500).json([]);
  }
  res.json({ status: res.statusCode, result: result });
});

router.post("/auth/local", async (req, res, next) => {
  const { email, password } = req.body;
  const response = await login(email, password);
  res.json(response);
});

router.post("/auth/google", async (req, res) => {
  const googleToken = req.header("Authorization").replace("Bearer ", "");
  let userDB = undefined;
  const userGoogle = await getGoogleUserByToken(googleToken);

  if (userGoogle.data) {
    userDB = await getUserByEmail(userGoogle.data.email);
  } else {
    res.send("No se ha podido autenticar");
  }

  if (userDB === null || userDB === undefined) {
    userDB = {
      fullname: userGoogle.data.name,
      email: userGoogle.data.email,
      gamesStatistics: {
        snake: {
          id: SNAKE_ID,
          maxScore: 0,
          isFav: false,
          timesPlayed: 0,
        },
      },
    };
    const result = await addUser(userDB);
    userDB = await getUserByEmail(userGoogle.data.email);
  }
  const token = await generateAuthToken(userDB);
  let response = { ...userDB, token: token };
  res.json(response);
});

export default router;
