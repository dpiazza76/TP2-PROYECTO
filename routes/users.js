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

import {auth} from "../middleware/auth.js"

import express from "express";
const SNAKE_ID = "618b328ecaa87bef9064528a";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    res.status(500).json([]);
  }
});

//Get ranking sorted by maxScore
router.get("/ranking", auth,  async function (req, res, next) {
  try {
    const users = await getRanking();
    res.send(users);
  } catch (error) {
    res.status(500).json([]);
  }
});

//Search user by email.
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

//Search user by id.
router.get("/:id", async (req, res, next) => {
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

//Add user
router.post("/", async (req, res, next) => {
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

router.post("/auth/local", async (req, res, next) => {
  const { email, password } = req.body;
  const response = await login(email, password);
  res.json(response);
});

router.post("/auth/google", async (req, res) => {
  const googleToken = req.header('Authorization').replace('Bearer ', '');
  let userDB = undefined;
  const userGoogle = await getGoogleUserByToken(googleToken)

  if (userGoogle.data) {
    userDB = await getUserByEmail(userGoogle.data.email);
    
  } else {
    res.send("No se ha podido autenticar")
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
          timesPlayed: 0
        }
      }
    };
    const result = await addUser(userDB);
    userDB = await getUserByEmail(userGoogle.data.email);
  }
  const token = await generateAuthToken(userDB);
  let response = {...userDB, token:token}
  res.json(response);
});

//Update user
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

//Delete user by id.
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let result = undefined;
  try {
    result = await deleteUser(id);
  } catch (error) {
    res.status(500).json([]);
  }
  res.json({ status: res.statusCode, result: result });
});

export default router;
