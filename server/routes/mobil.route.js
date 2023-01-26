const express = require('express');
const mobilController = require("../controllers/mobil.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.post('/',verifyJWT, mobilController.createMobil);
router.get('/',verifyJWT, mobilController.listMobils);
router.get('/get/:id',verifyJWT, mobilController.getMobil);
router.get('/perday',verifyJWT, mobilController.perDaySells);
router.put('/:id',verifyJWT, mobilController.updateMobil);
router.delete('/:id',verifyJWT, mobilController.deleteMobil);
module.exports = router;