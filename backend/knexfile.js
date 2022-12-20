// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      database: "event",
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },

  staging: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      database: "event",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      database: "event",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },
};
