const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");

const todoRouter = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use("/", todoRouter);

module.exports = app;
