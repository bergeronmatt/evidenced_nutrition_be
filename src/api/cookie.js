const express = require('express');
const jwt = require('jsonwebtoken');

const secret = require('../../secrets');

const router = express.Router();

// Generate JWT after cookie auth
router.post('/', (req, res) => {

    // let id = Math.random();

    // const token = generateToken(id);

    // res.status(200).json({
    //     message: 'Session Id',
    //     token: token
    // })

})

function generateToken(id) {
    const payload = {
        subject: id,
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = {
    router,
    generateToken
}