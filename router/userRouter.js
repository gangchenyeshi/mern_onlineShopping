const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");


router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login)
router.get('/refresh_token', userCtrl.refreshToken)

module.exports = router;