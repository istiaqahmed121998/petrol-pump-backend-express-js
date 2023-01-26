require("dotenv").config();
const { Sequelize } = require("sequelize");
module.exports.connect = async (
  hostname,
  port,
  database,
  username,
  password
) => {
  const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port,
    dialect: "postgres",
    logging: false,
    dialectOptions: process.env.NODE_ENV === "production" && {
      ssl: {
        require: false,
      },
    },
  });
  sequelize.authenticate();
};
