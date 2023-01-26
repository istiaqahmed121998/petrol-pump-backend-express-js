'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING,allowNull: false},
    password: {type:DataTypes.STRING},
    phone: {type:DataTypes.STRING},
    profile_pic: {type:DataTypes.STRING,allowNull:true},
    address:{type:DataTypes.STRING,allowNull:true},
  }, {
    sequelize,
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email']
      },
    ],
    modelName: 'User',
  });
  return User;
};