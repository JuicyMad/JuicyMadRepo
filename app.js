require("dotenv").config();
// aver si puta va
const express = require("express");
const logger = require('morgan');
const createError = require('http-errors');
const passport = require("passport");
const path = require ('path');

// DB 
require("./config/db.config");

// HBS
require("./config/hbs.config");

const app = express();

app.use(logger("dev"));
app.use(express.json())

app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname + '../public')));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

/* Session middlewares */
const { sessionConfig } = require('./config/session.config');
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

// static files
app.use(express.static("public"));

// routes
const router = require("./config/routes.config");
app.use("/", router)

// Errors Middlewares
app.use((req, res, next)=>{
  next(createError(404, "Resourse not found"));
});

app.use((error, req, res, next)=>{
  console.log(error);
  let status = error.status || 500;

  res.status(status).render("error",{
    message: error.message,
    error: req.app.get("env") === "development" ? error: {}
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Juicy Mad on port ${PORT}!!`));