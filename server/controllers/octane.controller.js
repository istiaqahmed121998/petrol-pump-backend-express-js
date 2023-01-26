const httpStatus = require("http-status");
const octaneService = require("../services/octane.service");
const createOctane = async (req, res, next) => {
  const octanedata  = ({
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
    const octane = await octaneService.createOctane(octanedata)
    res.status(httpStatus.CREATED).send({ data:octane });
  } catch (error) {
    next(error);
  }
};
const listOctanes = async (req, res, next) => {
  try {
    const {count,rows} = await octaneService.getOctanes(req.query);
    res.status(httpStatus.OK).json({ data: rows,total:count });
  } catch (error) {
    next(error);
  }
};
const getOctane = async (req, res, next) => {
  try {
    const octanes = await octaneService.getOctane(req.params.id);
    res.status(httpStatus.OK).json({ data: octanes });
  } catch (error) {
    next(error);
  }
};

const perDaySells = async (req, res, next) => {
  try {
    const octanes = await octaneService.getPerDayOctanes(req.query);
    res.status(httpStatus.OK).json({ data: octanes });
  } catch (error) {
    next(error);
  }
};

const updateOctane = async (req, res, next) => {
    const octanedata  = ({
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
    const octane = await octaneService.updateOctane(req.params.id,octanedata);
    return res.status(httpStatus.OK).json({ data: octane });
  } catch (error) {
    next(error);
  }
};
const deleteOctane = async (req, res, next) => {
  try {
    const manager = await octaneService.deleteOctane(req.params.id);
    return res.status(httpStatus.OK).json({ data: manager });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOctane,
  listOctanes,
  updateOctane,
  deleteOctane,
  perDaySells,
  getOctane,
};
