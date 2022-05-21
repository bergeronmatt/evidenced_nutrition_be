// Update with your config settings.
require("dotenv").config();


module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: "./src/data/data.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },


  testing: {
    client: 'sqlite3',
    connection: {
      filename: "./src/data/data.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },


  production: {
    client: 'sqlite3',
    connection: {
      filename: "./src/data/data.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  }
}
