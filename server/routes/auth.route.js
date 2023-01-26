const express = require('express');
const authController = require("../controllers/auth.controller")
const verifyJWT= require("../middlewares/verifyJWT")
const router = express.Router();

router.post('/', authController.login);
router.get('/me',verifyJWT, authController.authMe);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;