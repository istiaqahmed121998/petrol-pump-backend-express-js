const httpStatus = require("http-status");
const mobilService = require("../services/mobil.service");
const createMobil = async (req, res, next) => {
  const mobildata  = ({
    date,
    time,
    shift,
    prev_stock,
    new_stock,
    total_stock,
    sell_quantity,
    buy_rate,
    sell_rate,
    invest,
    earn,
    profit,
    manager,
  } = req.body);
  try {
    const mobil = await mobilService.createMobil(mobildata)
    res.status(httpStatus.CREATED).send({ data:mobil });
  } catch (error) {
    next(error);
  }
};
const listMobils = async (req, res, next) => {
  try {
    const {count,rows} = await mobilService.getMobils(req.query);
    res.status(httpStatus.OK).json({ data: rows,total:count });
  } catch (error) {
    next(error);
  }
};
const getMobil = async (req, res, next) => {
  try {
    const mobils = await mobilService.getMobil(req.params.id);
    res.status(httpStatus.OK).json({ data: mobils });
  } catch (error) {
    next(error);
  }
};

const perDaySells = async (req, res, next) => {
  try {
    const mobils = await mobilService.getPerDayMobils(req.query);
    res.status(httpStatus.OK).json({ data: mobils });
  } catch (error) {
    next(error);
  }
};

const updateMobil = async (req, res, next) => {
    const mobildata  = ({
        date,
        time,
        shift,
        prev_stock,
        new_stock,
        total_stock,
        sell_quantity,
        buy_rate,
        invest,
        sell_rate,
        profit,
        earn,
        manager,
      } = req.body);
  try {
    const mobil = await mobilService.updateMobil(req.params.id,mobildata);
    return res.status(httpStatus.OK).json({ data: mobil });
  } catch (error) {
    next(error);
  }
};
const deleteMobil = async (req, res, next) => {
  try {
    const manager = await mobilService.deleteMobil(req.params.id);
    return res.status(httpStatus.OK).json({ data: manager });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMobil,
  listMobils,
  updateMobil,
  deleteMobil,
  perDaySells,
  getMobil,
};
