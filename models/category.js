const mongoose = require("mongoose");

const CategorySchemna = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})


const CategoryModel = new mongoose.model('Category',CategorySchemna);


module.exports = CategoryModel;