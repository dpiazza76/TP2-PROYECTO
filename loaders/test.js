import {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  getUserGame
} from "./users.js";


// console.log(await getUsers());

//console.log(await getUserById("6174608a7d6a6d6b56c8d214"));

//console.log(await deleteUser("6174608a7d6a6d6b56c8d214"))

// console.log(
//   await addUser({
//     nombre: "gustavo",
//     email: "gustavo@gmail.com",
//     direccion: "saavedra",
//     numero: "235",
//   })
// );

//console.log(await getUserByEmail("pepe"))
// let usuario = await getUserByEmail("pepe")
// usuario.nombre = "fernando"
// console.log(await updateUser(usuario))

//console.log(getMaxScore("618b1bf7caa87bef90645287"))


console.log(await getUserGame("618b32fecaa87bef9064528b", "6190340cfdde5d1d28f874aa"))