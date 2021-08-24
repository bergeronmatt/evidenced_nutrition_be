// install dependencies
const express = require("express");

// set up server objects
const server = express();
const cors = require("cors");
const helmet = require("helmet");
var session = require("express-session");

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

// set up cookies
var sess = {
  secret: "keyboard cat",
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  genid: function (req) {
    return genuuid();
  },
  cookie: {
    maxAge: 60000
  },
};

// set up test proxy based on environment
if (server.get("env") === "production") {
  server.set("trust proxy", 1);
  session.cookie.secure = true;
}

// set cookie when accessing landing page

server.get("/cookie", (req, res) => {
  req.session.name = "Frodo";
  res.send('got it');
  console.log('got it');
});

server.get('/greet', (req, res) => {
  let sessName = req.session.name;
  res.send(`hello, ${sessName}`);
  console.log(`hello ${sessName}`)
});

// server.get("/client-session", function (req, res, next) {  
//   if (req.session.views) {
//     req.session.views++;
//     res.setHeader("Content-Type", "text/html");
//     res.write("<p>views: " + req.session.views + "</p>");
//     res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
//     res.end();
//   } else {
//     req.session.views = 1;
//     res.end("welcome to the session demo. refresh!");
//   }
// });


module.exports = server;