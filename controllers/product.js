const {
    productModel,
    subcategoryModel,
    categoryModel
} = require('../models');



module.exports = {
    get: {
        all: async (req,res,next)=>{
            try {
                const allProducts =await productModel.find().lean()
                res.status(200).json(allProducts);
            } catch (error) {
                res.status(500).end()
            }
        },

        delete: async (req,res,next)=>{
            try {
                const productId = req.params.id
                await productModel.findByIdAndDelete(productId);
                res.status(200).end()                
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

                const categoryInfo = await categoryModel.findOne({"name":category});
                const subcategoryInfo = await subcategoryModel.findOne({"name":subcategory, "category":categoryInfo._id});


                const newProduct = {
                    name,
                    category: categoryInfo._id,
                    subcategory: subcategoryInfo._id,
                    price: Number(price),
                    availability,
                    imageUrl
                };
                const createdProduct = await productModel.create(newProduct);
                await subcategoryModel.findByIdAndUpdate(subcategoryInfo._id,{$push:{"products":createdProduct._id}});
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

    }
}