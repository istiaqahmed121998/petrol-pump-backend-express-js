const httpStatus = require("http-status");
const ApiError = require("../lib/ApiError");
const { Expense } = require("../models");
const { Op } = require('sequelize');
const createExpense = async (expense) => {
  const expense_info = Expense.create(expense);
  return expense_info;
};
const getExpenses = async (query) => {
  const { column, sort, start, end } = query;
  const expenses = Expense.findAll({
    order: [
      [column, sort],
      ["id", "DESC"],
    ],
    where: {
      [Op.or]: [
        {
          date: {
            [Op.between]: [start, end],
          },
        },
      ],
    },
  });
  return expenses;
};
const getExpense = async (id) => {
  const expense = Expense.findByPk(id);
  return expense;
};
const updateExpense = async (id, params) => {
  const expense = await getExpense(id);
  if (!expense) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expense doesn't exist");
  }
  expense.set(params);
  expense.save();
  return expense
};
const deleteExpense = async (id) => {
  const expense = await getExpense(id);
  if (!expense) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expense doesn't exist");
  }

  expense.destroy();
};

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
