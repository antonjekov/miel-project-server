const userModel = require('./user');
const tokenBlacklist = require('./token-blacklist');
const productModel = require('./product');
const subcategoryModel = require('./subcategory');
const categoryModel = require('./category');

module.exports={
    userModel,
    tokenBlacklist,
    productModel,
    subcategoryModel,
    categoryModel
};