const httpStatus = require("http-status");
const expenseService = require("../services/expense.service");
const createExpense = async (req, res, next) => {
  const { reason, amount, date, time } = req.body;
  try {
    const expense = await expenseService.createExpense({
      reason,
      amount,
      date,
      time,
    });
    res.status(httpStatus.CREATED).send({ data: expense });
  } catch (error) {
    next(error);
  }
};
const listExpenses = async (req, res, next) => {
  try {
    const expenses = await expenseService.getExpenses(req.query);
    res.status(httpStatus.OK).json({ data: expenses });
  } catch (error) {
    next(error);
  }
};

const getExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.getExpense(req.params.id);
    return res.status(httpStatus.OK).json({ data: expense });
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  const { reason, amount, date } = req.body;
  try {
    const expense = await expenseService.updateExpense(req.params.id, {
      reason,
      amount,
      date,
    });
    return res.status(httpStatus.OK).json({ data: expense });
  } catch (error) {
    next(error);
  }
};
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.deleteExpense(req.params.id);
    return res.status(httpStatus.OK).json({ data: expense });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  listExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
