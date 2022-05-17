const express = require("express");
const cors = require("cors");
var session = require("express-session");
const jwt = require("jsonwebtoken");
const Auth = require('./auth-models/user-auth');
const bcrypt = require('bcryptjs');
const secret = require('../../secrets');
const User = require('../router/users/user-model')

const router = express.Router();
router.use(cors());
router.use(
  session({
    name: "SID",
    secret: process.env.COOKIE_SECRET,
    genid: function (req) {
      return Math.random().toString(36).substr(2, 9);
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: process.env.SAVE_UNINIT, //set to false for production GDPR laws against setting cookies automatically
    cookie: {
      domain: "",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "",
      secure: process.env.SECURE, //set to true for production,
      sameSite: "none",
    },
  })
);

// function to generate random session id
generateId = () => {
  var id = Math.random().toString(36).substr(2, 9);

  return id;
};

// function to generate Cookie Session Id to send to front end

generateToken = (id) => {
  const payload = {
    subject: id,
  };

  const options = {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// create Auth token for User Dashboard access
function generateAuthToken(payload) {

  console.log('token check: ', payload)

  const options = {
    expiresIn: 7 * 24 * 60 * 60 * 1000,
    issuer: 'Ley Line Development',
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)

}

// Login Route
router.post('/login', (req, res) => {

  console.log('username: ', req.body.username)
  console.log('password: ', req.body.password)

  let credentials = {
    email: req.body.username,
    password: bcrypt.hashSync(req.body.password, secret.hashRounds)
  }

  Auth.authUser(credentials).then(user => {

    if (!user) {
      res.status(403).json({ message: 'unrecognized user' })
      return;
    } else {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).json({ message: 'incorrect password' })
        return
      } else {
        const payload = {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        };

        const token = generateAuthToken(payload)

        res.header('Authorization', `${token}`)
        res.status(200).json({ message: 'login successful', token: token })

      }

    }

  })

})

// Get cookies

router.get("/", (req, res) => {
  const id = generateId();
  const token = generateToken(id);

  res.status(200).json({
    message: "Access Cookies",
    session: req.session,
    token: token,
  });
  console.log("got it");
});

router.get("/consult", (req, res) => {
  res.status(200).json({
    message: "Consult Request Received",
    session: req.session,
  });
});

router.get('/verify', (req, res) => {
  if (!req.headers.authorization) {
    res.status(403).json({
      message: 'Forbidden',
      href: '/unauthorized',
    })
    return
  }
  res.status(200).json({
    message: "Verified User it's working here",
    headers: req.headers
  })
})

router.put('/reset-password', (req, res) => {

  const {email, password} = req.body;

  User.findUserByEmail(email)
    .then(user => {
      if(!user) {
        res.sendStatus(400)
      } else {
        User.updatePassword(email, password)
          .then(update => {
            if(!update) {
              res.sendStatus(501)
            } else {
              res.sendStatus(200)
            }
          })
      }
    })
})

module.exports = router;
