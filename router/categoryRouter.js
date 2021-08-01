const express = require("express");
const router = express.Router();

const categoryCtrl = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const AuthAdmin = require("../middleware/authAdmin")

router.route('/category')
    .get(categoryCtrl.getCategory)
    
    .post(auth, AuthAdmin, categoryCtrl.CreateCategory)

router.route('/category/:id')
    .delete(auth, AuthAdmin, categoryCtrl.deleteCategory)
    .put(auth, AuthAdmin, categoryCtrl.updateCategory)

module.exports = router 