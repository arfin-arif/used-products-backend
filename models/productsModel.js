const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/usersModel');
const states = [
    "Mombasa",
    "Kwale",
    "Kilifi",
    "Tana River",
    "Lamu",
    "Taita Mak Taveta",
    "Garissa",
    "Wajir",
    "Mandera",
    "Marsabit",
    "Isiolo",
    "Meru",
    "Tharaka-Nithi",
    "Embu",
    "Kitui",
    "Machakos",
    "Makueni",
    "Nyandarua",
    "Nyeri",
    "Kirinyaga",
    "Murang’a",
    "Kiambu",
    "Turkana",
    "West Pokot",
    "Samburu",
    "Trans-Nzoia",
    "Uasin Gishu",
    "Elgeyo-Marakwet",
    "Nandi",
    "Baringo",
    "Laikipia",
    "Nakuru",
    "Narok",
    "Kajiado",
    "Kericho",
    "Bomet",
    "Kakamega",
    "Vihiga",
    "Bungoma",
    "Busia",
    "Siaya",
    "Kisumu",
    "Homa Bay",
    "Migori",
    "Kisii",
    "Nyamira",
    "Nairobi"
]


const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
        enum:states
    },
    city: {
        type: String,
        required: true,
      },
    price: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
       default:'available'
    },
    brand: {
        type: String,
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },

}
,{
    timestamps:true
}
)


module.exports = mongoose.model('Products', productsSchema);