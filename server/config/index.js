require('dotenv').config();

const bunyan = require('bunyan');
const path = require('path');

const loggers = {
  development: () => bunyan.createLogger({name: "development", level: "debug"}),
  production: () => bunyan.createLogger({name: "production", level: "info"}),
  test: () => bunyan.createLogger({name: "test", level: "fatal"}),
}

module.exports = {
  whitelist:(process.env.WHITELIST).split(','),
  development: {
    sitename: 'Sadek Accounts',
    log: loggers.development,
    database: {
      HOST: process.env.DEV_POSTGRESQL_HOST,
      PORT:process.env.DEV_POSTGRESQL_PORT,
      DB:process.env.DEV_POSTGRESQL_DB,
      USER:process.env.DEV_POSTGRESQL_USER,
      PASS:process.env.DEV_POSTGRES_PASSWORD,
    },

  },
  production: {
    sitename: 'Sadek Accounts',
    log: loggers.production,
    database: {
      HOST: process.env.PROD_DB_HOSTNAME,
      PORT:process.env.PROD_DB_PORT,
      DB:process.env.PROD_DB_NAME,
      USER:process.env.PROD_DB_USERNAME,
      PASS:process.env.PROD_DB_PASSWORD,
    },
    whitelist:process.env.whitelist
  },
  test: {
    sitename: 'Art Meetups [Test]',
    log: loggers.test,
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback-test.json'),
      avatars: path.join(__dirname, '../data/avatars/test'),
    },
    database: {
      dsn: process.env.TEST_DB_DSN,
    },
  },
};