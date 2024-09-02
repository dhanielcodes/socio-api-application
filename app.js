const express = require("express");
const session = require("express-session");
const mongoConnect = require("connect-mongo");
const connectFlash = require("connect-flash");


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
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  var logged = false;

  /*In your function*/
  if (!logged) {
    console.log(req.headers)
    logged = true;
  }
  next();
});
app.use(express.static("public"));
app.set("views", "pages");
app.set("view engine", "ejs");

app.use("/", router);

module.exports = app;
