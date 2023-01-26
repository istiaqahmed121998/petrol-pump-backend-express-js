const httpStatus = require("http-status");
const managerService = require("../services/manager.service");
const createManager = async (req, res, next) => {
  const { manager_name, phone_number, shift } = req.body;

  try {
    const manager = await managerService.createManager({
      manager_name,
      phone_number,
      shift,
    });
    res.status(httpStatus.CREATED).send({ data: manager });
  } catch (error) {
    next(error);
  }
};
const listManagers = async (req, res, next) => {
  try {
    const managers = await managerService.getManagers();
    res.status(httpStatus.OK).json({ data: managers });
  } catch (error) {
    next(error);
  }
};

const getManager = async (req, res, next) => {
  try {
    const manager = await managerService.getManager(req.params.id);
    return res.status(httpStatus.OK).json({ data: manager });
  } catch (error) {
    next(error);
  }
};

const updateManager = async (req, res, next) => {
  const { manager_name, phone_number, shift } = req.body;
  try {
    const manager = await managerService.updateManager(req.params.id, {
      manager_name,
      phone_number,
      shift,
    });
    return res.status(httpStatus.OK).json({ data: manager });
  } catch (error) {
    next(error);
  }
};
const deleteManager = async (req, res, next) => {
  try {
    const manager = await managerService.deleteManager(req.params.id,);
    return res.status(httpStatus.OK).json({ data: manager });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createManager,
  listManagers,
  getManager,
  updateManager,
  deleteManager
};
