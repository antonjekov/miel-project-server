const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    bcryptSaltRounds
} = require('../app-config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address."],
        unique: true
    },

    name:{
        type: String,
        required: [true, "Name is Required."],
        maxlength: [50, "Name too long."],
        minlength: [3, "Name too short."]
    },
   
    password: {
        type: String,
        required: [true, "Password is Required."],
        minlength: [6, "Password too short."],
        maxlength: [13, "Password too long."]       
    },
    
})

userSchema.methods.matchPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, bcryptSaltRounds, (err, hash) => {
            if (err) {
                next(err);
                return;
            }
            this.password = hash;
            next();
        });
        return;
    }
    next();
});

module.exports = mongoose.model('Users', userSchema);