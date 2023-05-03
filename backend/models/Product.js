const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    inventory_quantity: {
        type: Number,
        required: true,
    },
    inventory_updated_time: {
        type: Date,
        required: false
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    }

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;