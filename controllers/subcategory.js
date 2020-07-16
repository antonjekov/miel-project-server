const {
    subcategoryModel, categoryModel
} = require('../models');


module.exports = {
    get: {
        all: async (req,res,next)=>{
            const category = req.params.category;
            try {
                const allSubcategories =await (await subcategoryModel.find().populate("category"));const searchedSubcategories = allSubcategories.filter(x=>x.category.name===category)
                res.status(200).json(searchedSubcategories);
            } catch (error) {
                next(error)
            }
        }
    },

    post: {
        add: async (req, res, next) => {
            if (!req.isAuthorized) {
                res.status(401).end();
                return
            }
            try {
                const {
                    category,
                    subcategory,
                    description,
                    imageUrl
                } = req.body;

                const categoryInfo = await categoryModel.findOne({"name":category})

                const newSubcategory = {
                    name: subcategory.toLowerCase(),
                    category: categoryInfo._id,
                    description,
                    imageUrl
                };
                
                const createdSubcategory = await subcategoryModel.create(newSubcategory);
                await categoryModel.findByIdAndUpdate(newSubcategory.category,{$push:{"subcategories":createdSubcategory._id}})
                res.status(200).json(createdSubcategory);
                return
            } catch (error) {
                if (error.name === 'ValidationError') {
                    const errors = Object.entries(error.errors).reduce((acc, curr) => {
                        acc[curr[0]] = curr[1].message
                        return acc
                    }, {});
                    res.status(422).json(errors)
                    return
                }
                res.status(500).end();
            }
        },

        edit: async (req, res, next) => {
//TO DO
        },

        delete: async (req, res, next) => {
//TO DO
        },
    }
}