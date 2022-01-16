var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true,
        default: 0
    },
    product_rate: {
        type: Number,
        required: true,
        default: 0
    },
    randomnumber: {
        type: String,
        default: 0
    }
})

module.exports = mongoose.model('productlist', productSchema);