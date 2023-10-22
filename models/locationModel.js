const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  cities: {
    type: [String],
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;