const httpStatus = require("http-status");
const ApiError = require("../lib/ApiError");
const { Diesel, Manager } = require("../models");
const { Op } = require('sequelize');
const { sequelize } = require("../models");
const createDiesel = async (dieselData) => {
  const diesel = Diesel.create(dieselData);
  return diesel;
};
const getDiesels = async (query) => {
  const { column,sort, start, end } = query;
  const diesels = Diesel.findAndCountAll({
    attributes: [
      "id",
      "date",
      "time",
      "shift",
      "prev_stock",
      "new_stock",
      "total_stock",
      "sell_quantity",
      "buy_rate",
      "sell_rate",
      "invest",
      "earn",
      "profit",
    ],
    order: [
      [column, sort],
      ['id', 'DESC']
    ],
    include: {
      model: Manager,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
    where: {
      [Op.or]: [{
          date: {
              [Op.between]: [start, end]
          }
      }]
  }
  
  });
  return diesels;
};
const getPerDayDiesels = async (query) => {
  const { column,sort, start, end } = query;
  const diesels = Diesel.findAll({
    attributes: [
      "date",
      [sequelize.fn('sum', sequelize.col('sell_quantity')), 'perday_sell_quantity'],
      [sequelize.fn('sum', sequelize.col('invest')), 'perday_invest'],
      [sequelize.fn('sum', sequelize.col('earn')), 'perday_earn'],
      [sequelize.fn('sum', sequelize.col('profit')), 'perday_profit'],
    ],
    order: [
      [column, sort],
    ],
    group: ['date'],

    where: {
      [Op.or]: [{
          date: {
              [Op.between]: [start, end]
          }
      }]
  }
  
  });
  return diesels;
};
const getDiesel = async (id) => {
  const manager = Diesel.findByPk(id,{
    attributes: {exclude: ['createdAt','updatedAt']},
  });
  return manager;
};
const updateDiesel = async (id, params) => {
  const diesel = await Diesel.findByPk(id);
  if (!diesel) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Manager doesn't exist");
  }
  diesel.set(params);
  diesel.save();
};
const deleteDiesel = async (id) => {
  const diesel = await Diesel.findByPk(id);
  if (!diesel) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Manager doesn't exist");
  }

  diesel.destroy();
};

module.exports = { getPerDayDiesels,createDiesel, getDiesels, updateDiesel, deleteDiesel,getDiesel };
