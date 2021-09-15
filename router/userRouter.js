const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middleware/auth");
const AuthAdmin = require("../middleware/authAdmin")

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/refresh_token', userCtrl.refreshToken);

router.get('/logout', userCtrl.logout);

router.get('/info', auth, userCtrl.getUser);

module.exports = router;