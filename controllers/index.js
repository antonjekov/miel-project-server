const user = require('./user');
const errors = require('./errors');
const product = require('./product');
const category = require('./category');
const subcategory = require('./subcategory');
const shoppingCart = require('./shoppingCart');
const message = require('./message');
const cloudinary = require('./cloudinary')
const stripe = require('./stripe')


module.exports={
    errors,
    user,
    product,
    category,
    subcategory,
    shoppingCart,
    message,
    cloudinary,
    stripe
}