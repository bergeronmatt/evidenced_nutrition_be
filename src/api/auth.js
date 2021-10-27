const express = require('express');
const cors = require('cors');
var session = require('express-session');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.use(cors());
router.use(session({
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
      secure: process.env.SECURE, //set to true for production,
      sameSite: 'none',
    }
}))

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

// Get cookies

router.get('/', (req, res) => {

    const id = generateId();
    const token = generateToken(id);

    res.status(200)
        .json({
            message: 'Access Cookies',
            session: req.session,
            token: token
        });
})

module.exports = router;