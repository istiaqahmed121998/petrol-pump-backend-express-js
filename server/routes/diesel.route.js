const express = require('express');
const dieselController = require("../controllers/diesel.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.post('/',verifyJWT, dieselController.createDiesel);
router.get('/',verifyJWT, dieselController.listDiesels);
router.get('/get/:id',verifyJWT, dieselController.getDiesel);
router.get('/perday',verifyJWT, dieselController.perDaySells);
router.put('/:id',verifyJWT, dieselController.updateDiesel);
router.delete('/:id',verifyJWT, dieselController.deleteDiesel);
module.exports = router;