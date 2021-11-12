import {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  getGoogleUserByToken
} from "../loaders/users.js";

import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await getUsers();
  res.send(users);
});


//Search user by email.
router.get("/search", async (req, res, next) => {
  const user = await getUserByEmail(req.query.email);
  res.send(user);
});

//Add user
router.post("/", async (req, res, next) => {
  // Chequing non existance of user
  if (await getUserByEmail(req.body.email))
    res.json({ error: "Email ya existente" });

  const user = req.body;
  const result = await addUser(user);

  res.json({ status: result.statusCode, user: user });
});

//Update user
router.post("/update/:id", async (req, res, next) => {
  //Chequing existance of user
  const user = getUserById(req.params.id);

  if (!user) res.json({ error: "Usuario no encontrado" });

  const result = updateUser(req.body);

  res.json({ status: result.statusCode, updatedProperties: req.body });
});

//Search user by id.
router.get("/getId/:id", async (req, res, next) => {
  const user = await getUserById(req.params.id);
  res.send(user);
});

//Delete user by id.
router.delete("/delete/:id", async (req, res, next) => {
  const result = await deleteUser(req.params.id);
  res.json({ status: res.statusCode, result: result });
});

router.get("/getToken/:AccessToken", async (req, res) => {
  const userGoogle = await getGoogleUserByToken(req.params.AccessToken);
  const userDB = await getUserByEmail(userGoogle.email)
  if (!userDB) {
    userDB = { email: userGoogle.email,
      maxScore : 0,
      fullname : userGoogle.name,
      timesPlayed : 0
    }
    const result = await addUser(userDB)
    userDB = getUserByEmail(userGoogle.email)
  }
  const token = generateAuthToken(userDB)
  res.json({ status: res.statusCode, result: token })
})


export default router;
