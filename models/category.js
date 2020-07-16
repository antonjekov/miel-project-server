const mongoose = require('mongoose');
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types;

const categorySchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: [true, "Name is Required."],
        maxlength: [20, "Name too long."],
        minlength: [3, "Name too short."]
    },
   
    imageUrl:{
        type: String,
        required: [true, "Image is Required"]
    },

    subcategories: [{ type: ObjectId, ref: "Subcategories" }]    
});

module.exports = mongoose.model('Categories', categorySchema);