const knex = require("knex")({
  debug: true,
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "event",
  },
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
