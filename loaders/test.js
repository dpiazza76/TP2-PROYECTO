import {
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  getUserGame,
  updateUserGame,
  updateFav
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


//console.log(await getUserGame("618b32fecaa87bef9064528b", "6190340cfdde5d1d28f874aa"))

let myuser = await getUserById("6191c3bc8db0c60c16a43f42")
const juego={
  id: '6191c3bc8db0c60c16a43f42',
  maxScore: 3200,
  isFav: true,
  timesPlayed: 100
}

const game = await updateUserGame(juego,"6191c3bc8db0c60c16a43f42")
console.log(game)

console.log(await updateFav("6191c3bc8db0c60c16a43f42"))

console.log(await getUserById("6191c3bc8db0c60c16a43f42"))