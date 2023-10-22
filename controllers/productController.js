const multer = require("multer");
const path = require("path");
const Product = require("../models/productsModel");
const User = require("../models/usersModel");

// Set storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

// File filter to allow only image file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

module.exports.upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports.createProduct = async (req, res, next) => {
  try {
    // Extract product details from the request body
    const {
      title,
      description,
      state,
      city,
      price,
      stock,
      brand,
      category,
      seller,
    } = req.body;

    // Create a new product object
    const product = new Product({
      title,
      description,
      state,
      city,
      price,
      stock,
      brand,
      category,
      seller,
      thumbnail: req.file.filename, // Set the filename of the uploaded image
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const { state, city, searchTerm } = req.query; // Get the state, city, and searchTerm from the query parameters
    const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters, default to 1
    const limit = parseInt(req.query.limit) || 10; // Get the number of items to display per page from the query parameters, default to 10
    const skip = (page - 1) * limit; // Calculate the number of items to skip based on the current page and limit

    const query = {};

    if (state) {
      query.state = { $regex: new RegExp(state, "i") }; // Case-insensitive regex matching for state
    }
    if (city) {
      query.city = { $regex: new RegExp(city, "i") }; // Case-insensitive regex matching for city
    }
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i"); // Case-insensitive regex for the searchTerm
      query.$or = [
        { title: searchRegex }, // Match title field
        { category: searchRegex }, // Match category field
        { brand: searchRegex }, // Match brand field
      ];
    }

    const products = await Product.find(query).skip(skip).limit(limit).exec(); // Find products matching the specified query and apply pagination

    const totalCount = await Product.countDocuments(query).exec(); // Get the total count of products matching the query

    const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages

    const hasNextPage = page * limit < totalCount; // Check if there is a next page

    const apiUrl = req.protocol + "://" + req.get("host") + req.originalUrl; // Generate the API URL

    res.json({
      products,
      currentPage: page,
      totalPages,
      totalItems: totalCount,
      hasNextPage,
      apiUrl,
    }); // Send a success response with the products, pagination information, and the API URL
  } catch (error) {
    next(error); // Pass the error to the next middleware to handle it
  }
};

module.exports.removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndRemove(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// API endpoint to update an existing product
module.exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const productData = req.body;

    // Check if a file was uploaded
    if (req.file) {
      productData.thumbnail = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: productData },
      { new: true }
    );

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
};

module.exports.getAProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("seller");
    res.json(product);
  } catch (error) {
    next(error);
  }
};
