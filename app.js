import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

// ROUTERS
import usersRouter from "./routes/users.js";
import indexRouter from "./routes/index.js";

// DB RELATED
import getConnection from "./loaders/mongo.js";

dotenv.config();
const app = express();

// GENERAL MIDDLEWARES
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTING MIDDLEWARES
app.use("/", indexRouter);
app.use("/api/users", usersRouter);

const mongoConnection = getConnection();
console.log("Mongo connection started.");

app.listen(process.env.PORT, () => {
  console.log(`Express server started at port: ${process.env.PORT}`);
});

export default app;
