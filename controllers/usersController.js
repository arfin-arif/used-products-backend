const User = require("../models/usersModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ email, role }, '66ee5435a53869a0a9e44db56c181b01e629ae50606bc3bde8ded03ae248e777');

    res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ email: user.email, role: user.role }, '66ee5435a53869a0a9e44db56c181b01e629ae50606bc3bde8ded03ae248e777');

    res.status(200).json({ message: 'Login successful', token,user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
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