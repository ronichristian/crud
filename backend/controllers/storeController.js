const mongoose = require("mongoose");

const Store = require("../models/Store");
const Product = require("../models/Product");

const getAllStores = async (req, res) => {
    let stores = await Store.find();

    res.status(200).json(stores);
}

const getStore = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such store"});
    }
    
    const store = await Store.findOne({ _id: id });

    if (!store) {
        return res.status(400).json({error: "No such store"});
    }

    return res.status(200).json(store);
}

const createStore = async (req, res) => {
    const { name, url } = req.body;
    
    try {
        const store = await Store.create({ name, url });
        res.status(200).json(store);
    } catch (error) {
        res.status(404).json({error: error.message});
    }

    res.json({mssg: "POST new store"});
}

const deleteStore = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such store"});
    }

    const store = await Store.findOneAndDelete({_id: id});

    if (!store) {
        return res.status(400).json({error: "No such store"});
    }

    return res.status(200).json({mssg: "Store deleted"});
}

const updateStore = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such store"});
    }

    const store = await Store.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!store) {
        return res.status(400).json({error: "No such store"});
    }

    const updatedStore = await Store.findById(id);

    return res.status(200).json(updatedStore);
}

module.exports = {
    getAllStores,
    getStore,
    createStore,
    deleteStore,
    updateStore,
};