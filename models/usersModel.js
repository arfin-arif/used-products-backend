const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name : {
     firstName:{
        type: String,
        required: true,
     },
     lastName:{
        type: String,
        required: true,
     }
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
       default:'user'
    },
    password: {
        type: String,
        required: true,
        minLength:4
    }

},{
    timestamps:true
}

)


module.exports = mongoose.model('User', userSchema);