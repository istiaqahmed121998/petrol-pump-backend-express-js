const express = require('express');
const managerController = require("../controllers/manager.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.post('/',verifyJWT, managerController.createManager);
router.get('/',verifyJWT, managerController.listManagers);
router.get('/:id',verifyJWT, managerController.getManager);
router.put('/:id',verifyJWT, managerController.updateManager);
router.delete('/:id',verifyJWT, managerController.deleteManager);
module.exports = router;