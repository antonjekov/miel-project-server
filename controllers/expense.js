const {tokenBlacklist,userModel,expenseModel} = require('../models');

const utils = require('../utils');
const authCookieName = require('../app-config').authCookieName;

module.exports = {
    get: {
        create: (req, res, next) => {
            res.render('expenseNew.hbs', {pageTitle: 'Create Expense', user: req.user});
        },

        report: async(req,res,next)=>{
            try {
                const expenses = [await expenseModel.findById(req.params.id).lean()];
                const expense = utils.formatExpenses(expenses)[0];
                res.render('report.hbs', {pageTitle: 'Report', user: req.user,expense});
            } catch (error) {
                next(error);
            }
        },

        delete: async(req,res,next)=>{
            try {
                const expenseId = req.params.id;
                const userId = req.user._id;
                await expenseModel.findByIdAndDelete(expenseId);
                await userModel.updateOne( {'_id':userId},{$pull:{"expenses":expenseId}});
                res.redirect('/expenses');
            } catch (error) {
                next(error);
            }
        }
    },

    post: {
        create: async(req, res, next) => {
            try {
                const {report,description,category,vault,merchant,total}=req.body;
                const newExpense = {report:report==='on'?true:false,description,category,vault,merchant,total,creator: req.user._id};
                const savedExpense = await expenseModel.create(newExpense);
                await userModel.findByIdAndUpdate({
                    _id: req.user._id
                }, {
                    $push: {
                        expenses: savedExpense._id
                    }
                });
                res.redirect('/expenses');
                
            } catch (error) {
                if (error.name==='ValidationError') {
                    const messages = Object.values(error.errors).map(x=>x.message).join('\n');
                    return res.render('expenseNew.hbs', {pageTitle: 'Create Expense',error:{message: messages} });
                }
                next(error)
            }           
        },

    }
}