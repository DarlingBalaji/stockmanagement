const Product = require('../models/product');
const random = require('random')


exports.addProduct = (req, res) => {
    const product = new Product(req.body);

    const cur_date = new Date().getFullYear();
    product.randomnumber = 'TEST'+ cur_date + random.int(1111, 9999);
    
    product.save((err, item) => {
        if (err || !item){
            return res.json({
                status: -114,
                message: "Unable to add product, something went wrong"
            });
        } else {
            res.json({
                status: 0,
                data: item,
                message: "Product added successfully"
            })
        }
    });
};

exports.getAllProduct = (req, res) => {
    Product.find().exec((err, products) => {
        if ( err ){
            return res.json({
                status: -114,
                message: "Unable to fetch products"
            });
        } else {
            res.json({
                status: 0,
                data: products,
                message: "Product list"
            });
        }
    });
};

// TO GET PARTICULAR CONTACT LIST
exports.getProduct = (req, res) => {
    var _id = req.params.productId.split(':')[1];
    Product.findById(_id).exec((err, product) => {
        if ( err ){
            return res.json({
                status: -114,
                message: 'Product not found',
                error: err
            });
        } else {
            return res.json({
                status: 0,
                data: product,
                message: 'Success'
            })
        }
    });
};


// TO UPDATE CONTACT LIST
exports.updateProduct = (req, res) => {
    console.log('req', res.body);
    var _id = req.params.productId.split(':')[1];
    Product.findByIdAndUpdate(_id, { $set: req.body }).exec((err, product) => {
        if ( err ){
            return res.json({
                status: -114,
                message: 'Product not found',
                error: err
            });
        } else {
            return res.json({
                status: 0,
                message: 'Product Updated Successfully'
            })
        }
    })
};

// TO DELETE CONTACT LIST
exports.deleteProduct = (req, res) => {
    var _id = req.params.productId.split(':')[1];
    console.log('_id', _id);
    Product.findByIdAndDelete(_id).exec((err, product) => {
        if ( err ){
            return res.json({
                status: -114,
                message: 'Product not found',
                error: err
            });
        } else {
            return res.json({
                status: 0,
                data: product,
                message: 'Product delete successfully'
            })
        }
    })
};