require('dotenv').config();
const dbConfig=require("./index")
module.exports = {
  development: {
    username: dbConfig.development.database.USER,
    password: dbConfig.development.database.PASS,
    database: dbConfig.development.database.DB,
    host: dbConfig.development.database.HOST,
    port: dbConfig.development.database.PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'production' ? false : true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  }
};