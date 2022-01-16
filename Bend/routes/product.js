var express = require('express');
var router = express.Router();

const { addProduct, getAllProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/product');

router.post('/product/add', addProduct);
router.get('/product/viewall', getAllProduct);
router.get('/product/get/:productId', getProduct);
router.put('/product/update/:productId', updateProduct);
router.delete('/product/delete/:productId', deleteProduct);

module.exports = router;                    