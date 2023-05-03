const express = require('express');

const {
    createStore,
    getAllStores,
    getStore,
    deleteStore,
    updateStore,
} = require("../controllers/storeController");

const router = express.Router();

router.get('/', getAllStores);

router.get('/:id', getStore);

router.post('/', createStore);

router.delete('/:id', deleteStore);

router.patch('/:id', updateStore);

module.exports = router;