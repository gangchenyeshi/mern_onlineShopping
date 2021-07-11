const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");


router.post('/register', userCtrl)

module.exports = router;