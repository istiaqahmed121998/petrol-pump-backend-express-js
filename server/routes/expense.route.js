const express = require('express');
const expenseController = require("../controllers/expense.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.post('/',verifyJWT, expenseController.createExpense);
router.get('/',verifyJWT, expenseController.listExpenses);
router.get('/:id',verifyJWT, expenseController.getExpense);
router.put('/:id',verifyJWT, expenseController.updateExpense);
router.delete('/:id',verifyJWT, expenseController.deleteExpense);
module.exports = router;