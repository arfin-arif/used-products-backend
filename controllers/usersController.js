const User = require("../models/usersModel");

module.exports.createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body); // create a new Product instance with request body data
        const savedUser = await newUser.save(); // save the new product to the database
        res.status(201).json(savedUser); // send a success response with the saved product data
    } catch (error) {
        next(error); 
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.getSingleUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.removeUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndRemove(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User removed successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.updateUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };