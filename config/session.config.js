const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const { MONGO_URL } = require("./db.config")

const DAYS_OF_COOKIE = 8;

module.exports.sessionConfig = expressSession({
  secret: process.env.COOKIE_SECRET || "SUPER-SECRET",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true,
    daysOfCookie: 24 * 3600 * 1000 * DAYS_OF_COOKIE
  },
  store: new MongoStore ({
    mongoUrl: MONGO_URL,
  })
})