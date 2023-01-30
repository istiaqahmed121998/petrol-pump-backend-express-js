const httpStatus = require("http-status");
const ApiError = require("../lib/ApiError");
const { Octane, Manager } = require("../models");
const { Op } = require('sequelize');
const { sequelize } = require("../models");
const createOctane = async (octaneData) => {
  const octane = Octane.create(octaneData);
  return octane;
};
const getOctanes = async (query) => {
  const { column,sort, start, end } = query;
  const octanes = Octane.findAndCountAll({
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
  return octanes;
};
const getPerDayOctanes = async (query) => {
  const { column,sort, start, end } = query;
  const octanes = Octane.findAll({
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
  return octanes;
};
const getOctane = async (id) => {
  const manager = Octane.findByPk(id,{
    attributes: {exclude: ['createdAt','updatedAt']},
  });
  return manager;
};
const updateOctane = async (id, params) => {
  const octane = await Octane.findByPk(id);
  if (!octane) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Manager doesn't exist");
  }
  octane.set(params);
  octane.save();
};
const deleteOctane = async (id) => {
  const octane = await Octane.findByPk(id);
  if (!octane) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Manager doesn't exist");
  }

  octane.destroy();
};

module.exports = { getPerDayOctanes,createOctane, getOctanes, updateOctane, deleteOctane,getOctane };
