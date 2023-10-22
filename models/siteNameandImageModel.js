const mongoose = require("mongoose");

const siteNameSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const siteName = mongoose.model("siteName", siteNameSchema);

module.exports = siteName;
