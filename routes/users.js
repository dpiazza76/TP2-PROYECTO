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
const SNAKE_ID = "618b328ecaa87bef9064528a"

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


//Search user by email.
router.get("/search", async (req, res, next) => {

  let email = req.query.email;
  if(!email) return res.status(400).json([]);

  try{
    const user = await getUserByEmail(req.query.email);
    if(!user) return res.status(400).json([]);

    res.json(user);
  } catch (error){
    res.status(500).json([]);
  }
});

//Add user
router.post("/", async (req, res, next) => {
  try{
    // Chequing non existance of user
    if (await getUserByEmail(req.body.email)) return res.json({ error: "Email ya existente" });

    const user = req.body;
    const result = await addUser(user);
    res.json({ status: result.statusCode, user: user });
  }catch (error){
    res.status(500).json([]);
  }
});

//Update user
router.post("/update/:id", async (req, res, next) => {
  try{
    //Chequing existance of user
    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const result = updateUser(req.body);
    res.json({ status: result.statusCode, updatedProperties: req.body });
  }catch (error){
    res.status(500).json([]);
  }  
});


//Search user by id.
router.get("/getId/:id", async (req, res, next) => {
  let id = req.params.id
  if(!id) return res.status(400).json([]);

  try{
    const user = await getUserById(id);
    if(!user) return res.status(404).json({error:"Not found"});

    res.json(user);
  }catch (error){
    res.status(500).json([]);
  }
});

//Delete user by id.
router.delete("/delete/:id", async (req, res, next) => {
  let id = req.params.id;
  if(!id) return res.status(400).json([]);
  try {
    const result = await deleteUser(id);
    res.json({ status: res.statusCode, result: result }); 
  } catch (error) {
    res.status(500).json([]);
  }
});

router.get("/getToken/:AccessToken", async (req, res) => {
  const userGoogle = await getGoogleUserByToken(req.params.AccessToken);
  const userDB = await getUserByEmail(userGoogle.email)
  if (!userDB) {
    userDB = {
      email: userGoogle.email,
      gamesStatistics: {
        snake: {
          id: SNAKE_ID,
          maxScore: 0,
          isFav: false,
          timesPlayed: 0
        },
      },
      fullname: userGoogle.name,
    }
    const result = await addUser(userDB)
    userDB = getUserByEmail(userGoogle.email)
  }
  const token = generateAuthToken(userDB)
  res.json({ status: res.statusCode, result: token })
})


export default router;
