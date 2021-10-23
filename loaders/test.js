import { addUser } from "./users.js";

console.log(
  await addUser({
    first: "primerUsuario",
    last: "Kepler2",
    year: 1571,
  })
);
