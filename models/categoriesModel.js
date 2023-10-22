const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
});

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;

// [
//     {"Job"},
//     {"Vehicle"},
//     {"For the home"},
//     {"Residence"},
//     {"Personally"},
//     {"Electronics"},
//     {"Sparetime Hobby"},
//     {"Business operations"},
//     {"Miscellaneous"},
//     ]