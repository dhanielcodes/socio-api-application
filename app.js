const express = require("express");
const session = require("express-session");
const mongoConnect = require("connect-mongo");

const app = express();
const router = require("./router");
const db = require("./db");

const sessionOptions = session({
  secret: "Ahi Ahi tribe",
  store: mongoConnect.create({ client: db }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "strict" },
});

app.use(sessionOptions);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.set("views", "pages");
app.set("view engine", "ejs");

app.use("/", router);

module.exports = app;
