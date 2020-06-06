const userModel = require('./user');
const expenseModel = require('./expense');
const tokenBlacklist = require('./token-blacklist');
const productModel = require('./product');

module.exports={
    userModel,
    expenseModel,
    tokenBlacklist,
    productModel
};