const mongoose = require('mongoose');
const { String, Number, Boolean, ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Product name is Required."],
        maxlength: [60, "Product name must be max 100 chars"],
        minlength: [3, "Product name must be min 3 chars"]
    },
   
    price: {
        type: Number,
        required: [true, "Price is Required."],
        min: [0.10, "Price must be greater or equal to 0.10 EUR"],
        max: [100, "Price must be max 100.00 EUR"]       
    },

    discount: {
        type: Number,
        required: [true, "Discount is Required."],
        min: [0, "Discount must be greater or equal to 0"],
        max: [99, "Discount must be max 99"]       
    },

    category:{type: ObjectId, ref: "Categories"},

    subcategory:{type: ObjectId, ref: "Subcategories"},

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