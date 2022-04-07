const db = require('../../data/config');
const jwt = require("jsonwebtoken");

function authUser(credentials) {

    const user = db('users').where('email', credentials.email).first()
    if (!user) {
        return null
    } else {
        return user
    }

}

module.exports = {
    authUser,
}