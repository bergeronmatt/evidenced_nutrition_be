// install dependencies
const express = require("express");

// set up server objects
const server = express();
const cors = require("cors");
const helmet = require("helmet");
var session = require("express-session");
const jwt = require("jsonwebtoken");
const secret = require('../../secrets');

// set trust proxy
server.set("trust proxy", 1);

// set server to use objects
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session({
  name: 'notsession',
  secret: 'keyboard cat',
  cookie: {
    name: 'Bilbo',
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false, //set true in production
    httpOnly: true,
  },
  resave: false, 
  saveUninitialized: true, //set to false for production GDPR laws against setting cookies automatically
}));

server.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));

// File Specific Endpoints
// set up test proxy based on environment
if (server.get("env") === "production") {
  server.set("trust proxy", 1);
  session.cookie.secure = true;
}

// function to generate random session id
  generateId = () => {
    var id = Math.random().toString(36).substr(2, 9);

    return id;
}

// function to generate Cookie Session Id to send to front end

  generateToken = (id) => {
    const payload = {
        subject: id,
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secret.jwtSecret, options);
  }

// set cookie when accessing landing page

server.get("/cookie", (req, res) => {
  
  const id = generateId();

  const token = generateToken(id);
  
  res.status(200).json({
    message: 'authorization received',
    token: token
  });

  console.log('got it');
});

module.exports = server;