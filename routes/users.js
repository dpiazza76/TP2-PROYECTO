import {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
} from "../loaders/users.js";
import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await getUsers();
  res.send(users);
});

//agregar usuario

export default router;
