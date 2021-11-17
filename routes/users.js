import {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  getGoogleUserByToken,
  getRanking,
} from "../loaders/users.js";

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
router.get("/ranking", async function (req, res, next) {
  try {
    const users = await getRanking();
    res.send(users);
  } catch (error) {
    res.status(500).json([]);
  }
});


//Search user by email.
router.get("/search", async (req, res, next) => {
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

//Update user
router.post("/update/:id", async (req, res, next) => {
  let id = req.params.id;
  let user = undefined;
  try {
    user = await getUserById(id);
    //Chequing existance of user
    if (user == null) throw new Error("User not found!");

    const result = await updateUser(req.body);
    res.json({ status: result.statusCode, updatedProperties: req.body });
  } catch (error) {
    res.status(500).json({ error: "User not found!" });
  }
});

//Search user by id.
router.get("/getId/:id", async (req, res, next) => {
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

//Delete user by id.
router.delete("/delete/:id", async (req, res, next) => {
  let id = req.params.id;
  let result = undefined;
  try {
    result = await deleteUser(id);
  } catch (error) {
    res.status(500).json([]);
  }
  res.json({ status: res.statusCode, result: result });
});

router.get("/getToken/:AccessToken", async (req, res) => {
  const userGoogle = await getGoogleUserByToken(req.params.AccessToken);
  const userDB = await getUserByEmail(userGoogle.email);
  if (!userDB) {
    userDB = {
      email: userGoogle.email,
      gamesStatistics: {
        snake: {
          id: SNAKE_ID,
          maxScore: 0,
          isFav: false,
          timesPlayed: 0,
        },
      },
      fullname: userGoogle.name,
    };
    const result = await addUser(userDB);
    userDB = getUserByEmail(userGoogle.email);
  }
  const token = generateAuthToken(userDB);
  res.json({ status: res.statusCode, result: token });
});

export default router;
