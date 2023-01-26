'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Manager.init({
    manager_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    shift: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};