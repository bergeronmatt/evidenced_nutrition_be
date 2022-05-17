// import database
const db = require("../../data/config.js");
const bcrypt = require('bcryptjs');
const secrets = require('../../../secrets')

function encrypt(password) {
  return bcrypt.hashSync(password, secrets.hashRounds)
}

function getUsers() {
  return db("users");
}

function findUser(id) {
  return db("users").where({ id }).first();
}

function findUserByEmail(email) {
  return db('users').where({email}).first();
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => {
      return findUser(id);
    });
}

function updateUser(changes, id) {
  return db("users")
    .where([id])
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findUser(id);
      } else {
        return null;
      }
    });
}

function updatePassword(email, newPass) {

  let password = encrypt(newPass);

  return db('users')
    .where({email})
    .update('password', password)
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}

module.exports = {
  getUsers,
  findUser,
  findUserByEmail,
  addUser,
  updateUser,
  updatePassword,
  deleteUser,
};
