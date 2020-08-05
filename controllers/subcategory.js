const {
    subcategoryModel, categoryModel
} = require('../models');


module.exports = {
    get: {
        all: async (req,res,next)=>{
            try {
                const category = req.params.category;
                const allSubcategories =await subcategoryModel.find().populate("category");
                const searchedSubcategories = allSubcategories.filter(x=>x.category.name===category)
                res.status(200).json(searchedSubcategories);
            } catch (error) {
                res.status(500).end()
            }
        },

        allProductsInSubcat: async(req,res,next)=>{
            try {
                const subcategoryId = req.body.subcategoryId;
                const subcategory = await subcategoryModel.findById(subcategoryId).populate('products')
                res.status(200).json(subcategory)                
            } catch (error) {
                res.status(500).end()
            }
        }
    },

    post: {
        add: async (req, res, next) => {
            try {
                const {
                    category,
                    name,
                    description,
                    imageUrl
                } = req.body;

                const categoryInfo = await categoryModel.findOne({"name":category})

                const newSubcategory = {
                    name: name.toLowerCase(),
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