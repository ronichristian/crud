const express = require('express');

const {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:id', getProduct);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct);

module.exports = router;