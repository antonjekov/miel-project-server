const {expenseModel,userModel} = require('../models');

module.exports = {
    get: {
        profile: async (req, res, next) => {
            try {
                const userId = req.user._id;
                const user = await userModel.findById(userId);
                const expenses = await expenseModel.find({'_id': {$in: user.expenses}});
                const totalMerches=expenses.length;
                const totalAmount=expenses.reduce((acc,cur)=>{
                    acc+=cur.total;
                    return acc;
                },0);
                const availableAmount = user.amount-totalAmount;
                res.render('profile.hbs', {pageTitle: 'Profile', totalMerches,totalAmount,  availableAmount,user: req.user})       
            } catch (error) {
                next(error);
            }
                 
        }
    }

}