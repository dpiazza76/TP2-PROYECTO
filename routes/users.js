import { addUser, getUsers, updateUser, getUserByEmail, getUserById, deleteUser } from "../services/users.js";
import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await getUsers();
  res.send(users);
});

// search user by e-mail using query params => /users/search?email={email}
router.get("/search", async (req, res, next) => {
  const email = req.query.email;
  const user = await getUserByEmail(email);
  res.send(user);
});

// search user by id (using path parameters) => users/{id}
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await getUserById(id);
  res.send(user);
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  const newUser = await addUser(data);

  console.log(newUser)

  res.send(newUser);
});

router.put("/:id", async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const updatedUser = await updateUser(id, data);

  res.send(updatedUser);
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const deletedUser = await deleteUser(id);
  return res.send(deletedUser);
});

export default router;
