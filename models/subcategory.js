const mongoose = require('mongoose');
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types;

const subcategorySchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: [true, "Name is Required."],
        maxlength: [50, "Name too long."],
        minlength: [3, "Name too short."]
    },   
    
    description:{
        type: String,
        maxlength: [200, "Description too long."],
        minlength: [3, "Description too short."],
        required: [true, "Description is Required"]
    },
    
    imageUrl:{
        type: String,
        required: [true, "Image is Required"]
    },

    category: {type: ObjectId, ref: "Categories"},

    products: [{ type: ObjectId, ref: "Products" }]
    
});



module.exports = mongoose.model('Subcategories', subcategorySchema);