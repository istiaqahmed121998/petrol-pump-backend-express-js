'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mobil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Manager,{
        foreignKey: {
          name: 'manager'
        }
      });
    }
  }
  Mobil.init({
    date: DataTypes.DATEONLY,
    time: DataTypes.STRING,
    shift: DataTypes.STRING,
    prev_stock: DataTypes.DECIMAL,
    new_stock: DataTypes.DECIMAL,
    total_stock: DataTypes.DECIMAL,
    sell_quantity: DataTypes.DECIMAL,
    buy_rate: DataTypes.DECIMAL,
    sell_rate: DataTypes.DECIMAL,
    invest: DataTypes.DECIMAL,
    earn: DataTypes.DECIMAL,
    profit: DataTypes.DECIMAL,
    manager: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mobil',
  });
  return Mobil;
};