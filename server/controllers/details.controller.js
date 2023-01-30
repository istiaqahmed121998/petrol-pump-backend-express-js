const detailsService = require("../services/details.service");
const httpStatus = require("http-status");
const perday = async (req, res, next) => {
  const results = await detailsService.perDaySells(req.query);
  res.status(httpStatus.OK).json({ data: results });
  try {
  } catch (error) {
    next(error);
  }
};

const permonth = async (req, res, next) => {
  try {
    const results = await detailsService.perMonthSells(req.query);
    res.status(httpStatus.OK).json({ data: results });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  perday,
  permonth,
};
