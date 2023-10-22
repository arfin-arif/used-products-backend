const mongoose = require("mongoose");

const siteNameSchema = new mongoose.Schema({
  siteName: {
    type: String,
  },
  image: {
    type: String,
  },
});

const siteName = mongoose.model("siteName", siteNameSchema);

module.exports = siteName;
