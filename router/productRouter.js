const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/productController.js')

router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProducts)

router.route('/products/:id')
    .put(productCtrl.updateProducts)
    .delete(productCtrl.deleteProducts)

module.exports = router;