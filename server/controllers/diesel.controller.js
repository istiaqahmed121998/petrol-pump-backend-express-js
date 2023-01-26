const httpStatus = require("http-status");
const dieselService = require("../services/diesel.service");
const createDiesel = async (req, res, next) => {
  const dieseldata  = ({
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
    const diesel = await dieselService.createDiesel(dieseldata)
    res.status(httpStatus.CREATED).send({ data:diesel });
  } catch (error) {
    next(error);
  }
};
const listDiesels = async (req, res, next) => {
  try {
    const {count,rows} = await dieselService.getDiesels(req.query);
    res.status(httpStatus.OK).json({ data: rows,total:count });
  } catch (error) {
    next(error);
  }
};
const getDiesel = async (req, res, next) => {
  try {
    const diesels = await dieselService.getDiesel(req.params.id);
    res.status(httpStatus.OK).json({ data: diesels });
  } catch (error) {
    next(error);
  }
};

const perDaySells = async (req, res, next) => {
  try {
    const diesels = await dieselService.getPerDayDiesels(req.query);
    res.status(httpStatus.OK).json({ data: diesels });
  } catch (error) {
    next(error);
  }
};

const updateDiesel = async (req, res, next) => {
    const dieseldata  = ({
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
    const diesel = await dieselService.updateDiesel(req.params.id,dieseldata);
    return res.status(httpStatus.OK).json({ data: diesel });
  } catch (error) {
    next(error);
  }
};
const deleteDiesel = async (req, res, next) => {
  try {
    const manager = await dieselService.deleteDiesel(req.params.id);
    return res.status(httpStatus.OK).json({ data: manager });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDiesel,
  listDiesels,
  updateDiesel,
  deleteDiesel,
  perDaySells,
  getDiesel,
};
