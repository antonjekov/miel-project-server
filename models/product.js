const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Product name is Required."],
        maxlength: [100, "Product name must be max 100 chars"],
        minlength: [3, "Product name must be min 3 chars"]
    },
   
    price: {
        type: Number,
        required: [true, "Price is Required."],
        min: [0, "Price must be greater or equal to 0.00 EUR"],
        max: [100, "Price must be max 100.00 EUR"]       
    },

    category:{
        type: String,
        required: [true, "Product category is Required"]
    },

    subcategory:{
        type: String,
        required: [true, "Product subcategory is Required"]
    },

    availability:{
        type: String,
        required: [true, "Availability is Required"]
    },

    imageUrl:{
        type: String,
        required: [true, "Image is Required"]
    },
    
})

module.exports = mongoose.model('Products', productSchema);