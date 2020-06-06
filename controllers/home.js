const {expenseModel,userModel} = require('../models');
const utils = require('../utils');

module.exports = {
    get: {
        home: async (req, res, next) => {            
            try {              
                res.render('home.hbs', {
                    pageTitle: 'Home Page'
                });
            } catch (error) {
                next(error);
            }
        },

        expenses: async (req,res,next)=>{
            try {
                const userInfo =await userModel.findById(req.user._id);
                let expenses =await expenseModel.find({'_id': { $in: userInfo.expenses}}).lean();
                expenses = utils.formatExpenses(expenses);
                res.render('expenses.hbs', {
                    pageTitle: 'Expenses', user: req.user, expenses
                });
            } catch (error) {
                next(error);
            }
        }

        
    }
}