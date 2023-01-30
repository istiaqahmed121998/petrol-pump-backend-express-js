const express = require('express');
const detailsController = require("../controllers/details.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.get('/peyday',verifyJWT, detailsController.perday);
router.get('/permonth',verifyJWT, detailsController.permonth);
module.exports = router;