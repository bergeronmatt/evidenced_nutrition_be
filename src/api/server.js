// install dependencies
const express = require("express");

// set up server objects
const server = express();
const cors = require("cors");
const helmet = require("helmet");
var session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const secrets = require("../../secrets");


// set server to use objects
server.use(cors());
// server.use(cors({
//   origin: "https://evidenced-nutrition.vercel.app/",
//   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//   credentials: true
// }));
server.use(helmet());
server.use(express.json());
server.use(session({
  name: 'SID',
  secret: process.env.COOKIE_SECRET,
  genid: function(req) {
    return Math.random().toString(36).substr(2, 9);;
  },
  httpOnly: true,
  resave: false, 
  saveUninitialized: process.env.SAVE_UNINIT, //set to false for production GDPR laws against setting cookies automatically
  cookie : {
    domain: "",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "",
    secure: process.env.SECURE, //set to true for production
  }
}));

// server.use(cors({
//   origin: 'https://evidenced-nutrition-q6oj1xu4h-bergeronmatt.vercel.app/',
//   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//   credentials: true
// }));

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
        expiresIn: 1 * 24 * 60 * 60 * 1000,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

// set cookie when accessing landing page

  generateCookie = (name, value, options) => {

    

  }

server.get("/cookie", (req, res) => {
  
  const id = generateId();

  const token = generateToken(id);

  res.status(200).json({
    message: 'authorization received',
    token: token,
  });

  console.log('got it');
});

server.post('/cookie', (req, res) => {
  // res.json(req.body);

  console.log('session: ', req.session);

  let {path} = req.body;
  console.log('req.body: ', req.body);

  req.session.cookie.path = path;

  console.log('path: ', req.session.cookie.path);

  res.json(req.session);

})

module.exports = server;