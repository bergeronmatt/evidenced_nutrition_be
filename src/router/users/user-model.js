// import database
const db = require("../../data/config.js");

function getUsers() {
  return db("users");
}

function findUser(id) {
  return db("users").where({ id }).first();
}

function addUser(user) {
  return db("user")
    .insert(user, "id")
    .then(([id]) => {
      return findUser(id);
    });
}

function updateUser(changes, id) {
  return db("user")
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

function deleteUser(id) {
  return db("users").where("id", id).del();
}

module.exports = {
  getUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser,
};
