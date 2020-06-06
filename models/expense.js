const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: [true, "Merchant can't be empty"],
        minlength:[4, "Merchant name must bi minimum 4 characters long"]
    },

    date:{
        type: Date,
        required: true,
        default: new Date()
    },

    total:{
        type: Number,
        required:true,
        default:0,
        min:0
    },
   
    category:{
        type: String,
        required:true
    },

    description:{
        type: String,
        required:true,
        minlength: [10, 'Description length must be minimum 10 characters!'],
        maxlength: [50, 'Description length must be maximum 50 characters!']
    },
    
    report:{
        type: Boolean,
        default: false
    },

    creator:{
        type: mongoose.Types.ObjectId, ref:'Users',
        required: true
    }
})

module.exports = mongoose.model('Expenses', userSchema);