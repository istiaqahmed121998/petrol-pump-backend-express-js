const httpStatus = require("http-status");
const ApiError = require("../lib/ApiError");
const { Mobil, Manager } = require("../models");
const { Op } = require('sequelize');
const { sequelize } = require("../models");
const createMobil = async (mobilData) => {
  const mobil = Mobil.create(mobilData);
  return mobil;
};
const getMobils = async (query) => {
  const { column,sort, start, end } = query;
  const mobils = Mobil.findAndCountAll({
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
  return mobils;
};
const getPerDayMobils = async (query) => {
  const { column,sort, start, end } = query;
  const mobils = Mobil.findAll({
    attributes: [
      "date",
      [sequelize.fn('sum', sequelize.col('sell_quantity')), 'perday_sell_quantity'],
      [sequelize.fn('sum', sequelize.col('invest')), 'payday_invest'],
      [sequelize.fn('sum', sequelize.col('earn')), 'payday_earn'],
      [sequelize.fn('sum', sequelize.col('profit')), 'payday_profit'],
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
  return mobils;
};
const getMobil = async (id) => {
  const manager = Mobil.findByPk(id,{
    attributes: {exclude: ['createdAt','updatedAt']},
  });
  return manager;
};
const updateMobil = async (id, params) => {
  const mobil = await Mobil.findByPk(id);
  if (!mobil) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Manager doesn't exist");
  }
  mobil.set(params);
  mobil.save();
};
const deleteMobil = async (id) => {
  const mobil = await Mobil.findByPk(id);
  if (!mobil) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Manager doesn't exist");
  }

  mobil.destroy();
};

module.exports = { getPerDayMobils,createMobil, getMobils, updateMobil, deleteMobil,getMobil };
