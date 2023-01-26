const httpStatus = require("http-status");
const ApiError = require("../lib/ApiError");
const { Manager } = require("../models");

const createManager = async (manager) => {
  const manager_info = Manager.create(manager);
  return manager_info;
};
const getManagers = async () => {
  const managers = Manager.findAll();
  return managers;
};
const getManager = async (id) => {
  const manager = Manager.findByPk(id);
  return manager;
};
const updateManager = async (id,params) => {
  const manager = await getManager(id);
  if(!manager){
    throw new ApiError(httpStatus.BAD_REQUEST,"Manager doesn't exist")
  }
  manager.set(params);
  manager.save();
};
const deleteManager = async (id) => {
    const manager = await getManager(id);
    if(!manager){
      throw new ApiError(httpStatus.BAD_REQUEST,"Manager doesn't exist")
    }

    manager.destroy();
  };

module.exports = { createManager, getManagers, getManager,updateManager,deleteManager };
