const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Products = require('../models/productsModel');

module.exports.getAllProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // get the current page from the query parameters, default to 1
        const limit = parseInt(req.query.limit) || 6; // get the number of items to display per page from the query parameters, default to 10
        const skip = (page - 1) * limit; // calculate the number of items to skip based on the current page and limit

        const products = await Products.find().skip(skip).limit(limit); // find the products for the current page and limit

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(await Products.countDocuments() / limit),
            totalItems: await Products.countDocuments(),
            hasNextPage: (page * limit) < await Products.countDocuments(),
        }); // send a success response with the product data, current page, total pages, total items, and a flag indicating if there is a next page
    } catch (error) {
        next(error); // pass the error to the next middleware to handle it
    }
};

module.exports.addProduct = async (req, res, next) => {
    try {
        const newProduct = new Products(req.body); // create a new Product instance with request body data
        const savedProduct = await newProduct.save(); // save the new product to the database
        res.status(201).json(savedProduct); // send a success response with the saved product data
    } catch (error) {
        next(error); // pass the error to the next middleware to handle it
    }
};
module.exports.removeProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findByIdAndRemove(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// API endpoint to update an existing product
module.exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Products.findByIdAndUpdate(
            productId,
            { $set: req.body },
            { new: true }
        );

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.send(product);
    } catch (error) {
        next(error);
    }
}

// API endpoint to retrieve a page of products
module.exports.getProducts = async (req, res) => {
    const { page = 1, limit = 10, search, priceOrder, category } = req.query;

    try {
        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        if (category) {
            filter.category = category;
        }

        const sort = {};
        if (priceOrder === 'asc') {
            sort.price = 1;
        } else if (priceOrder === 'desc') {
            sort.price = -1;
        }

        const count = await Products.countDocuments(filter);
        const totalPages = Math.ceil(count / limit);

        const products = await Products.find(filter)
            .sort(sort)
            .limit(limit)
            .skip((page - 1) * limit);

        res.json({ products, totalPages });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};








//  async (req, res, next) => {
//     try {
//         const page = parseInt(req.query.page) || 1; // get the current page from the query parameters, default to 1
//         const limit = parseInt(req.query.limit) || 10; // get the number of items to display per page from the query parameters, default to 10
//         const skip = (page - 1) * limit; // calculate the number of items to skip based on the current page and limit

//         const products = await Products.find().skip(skip).limit(limit); // find the products for the current page and limit

//         res.json({
//             products,
//             currentPage: page,
//             totalPages: Math.ceil(await Products.countDocuments() / limit),
//             totalItems: await Products.countDocuments(),
//             hasNextPage: (page * limit) < await Products.countDocuments(),
//         }); // send a success response with the product data, current page, total pages, total items, and a flag indicating if there is a next page
//     } catch (error) {
//         next(error); // pass the error to the next middleware to handle it
//     }
// };

module.exports.getAProduct = async (req, res, next) => {
    try {
        const productId = req.params.id; // get the product ID from the request parameters
        const product = await Products.findById(productId); // find the product by its ID
        res.json(product); // send a success response with the product data
    } catch (error) {
        next(error); // pass the error to the next middleware to handle it
    }
};


