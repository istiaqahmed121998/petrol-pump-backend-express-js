const express = require('express');
const authController = require("../controllers/auth.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.post('/', authController.login);
router.get('/me',verifyJWT, authController.authMe);
module.exports = router;