const {
    tokenBlacklist
} = require('../models');


module.exports = {
    get: {
        all: async (req,res,next)=>{
            try {
                const allCategories =await categoryModel.find().populate("subcategories")
                res.status(200).json(allCategories);
            } catch (error) {
                res.status(500).end()
            }
        }
    },

    post: {
        add: async (req, res, next) => {
            try {
                const {
                    name,
                    category,
                    subcategory,
                    price,
                    availability,
                    imageUrl
                } = req.body;

                const newProduct = {
                    name,
                    category,
                    subcategory,
                    price,
                    availability,
                    imageUrl
                };
                const createdProduct = await productModel.create(newProduct);
                await subcategoryModel.updateOne({"name":newProduct.subcategory},{$push:{"products":createdProduct._id}});
                res.status(200).json(createdProduct);
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
                res.status(500).end()
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