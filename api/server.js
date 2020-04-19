const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');


const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/router')
const restricted = require('../auth/restricted-middleware')

const server = express();

const sessionConfig = {
  name: "moster",
  secret: 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, // true in production, to send only over https
    httpOnly: true, // true means no access from JS
  },
  resave: false,
  saveUninitialized: true, // GDPR laws require to check with client
}

server.use(helmet());
server.use(express.json());
server.use(cors());
// needs an object, creating it above
server.use(session(sessionConfig))

// adding middleware to restrict access to users unless logged in
server.use("/api/users", restricted, usersRouter);
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
