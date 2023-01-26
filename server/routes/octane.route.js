const express = require('express');
const octaneController = require("../controllers/octane.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.post('/',verifyJWT, octaneController.createOctane);
router.get('/',verifyJWT, octaneController.listOctanes);
router.get('/get/:id',verifyJWT, octaneController.getOctane);
router.get('/perday',verifyJWT, octaneController.perDaySells);
router.put('/:id',verifyJWT, octaneController.updateOctane);
router.delete('/:id',verifyJWT, octaneController.deleteOctane);
module.exports = router;