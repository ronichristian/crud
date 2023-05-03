const Product = require("../models/Product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1}).populate('store');

    res.status(200).json(products);

}

const getProduct = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such product"});
    }
    
    const product = await Product.findById(id).populate('store');

    if (!product) {
        return res.status(400).json({error: "No such product"});
    }

    return res.status(200).json(product);
}

const createProduct = async (req, res) => {
    const { name, sku, inventory_quantity, store } = req.body;
    
    try {
        const product = await Product.create({ name, sku, inventory_quantity, store });
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({error: error.message});
    }

    res.json({mssg: "POST new product"});
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such product"});
    }

    const product = await Product.findOneAndDelete({_id: id});

    if (!product) {
        return res.status(400).json({error: "No such product"});
    }

    return res.status(200).json({mssg: "Product deleted"});
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const params = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such product"});
    }

    const product = await Product.findOneAndUpdate({_id: id}, {
        inventory_quantity: params.inventory_quantity,
        inventory_updated_time: new Date()
    });

    if (!product) {
        return res.status(400).json({error: "No such product"});
    }

    const updatedProduct = await Product.findById(id);

    return res.status(200).json(updatedProduct);
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
};