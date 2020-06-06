const {
    productModel
} = require('../models');



module.exports = {
    get: {},

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
                next(error);
            }
        },

        edit: async (req, res, next) => {

        },
    }
}