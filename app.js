import connect from "./loaders/mongo.js";
import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const mongo = connect();
console.log(mongo);

app.listen(process.env.PORT, () => {
  console.log(`Server express ejecuntandose en el puerto:${process.env.PORT}`);
});

export default app;
