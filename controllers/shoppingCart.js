const {userModel} = require('../models');

module.exports = {
    get: {
        all: async (req, res, next) => {
            const {user,isLoggedIn}= req
            if (!isLoggedIn) {
                res.status(401).end()
                return
            }
            try {
                const userInfo = await userModel.findById(user._id).populate("shoppingCard").lean();
                res.status(200).json(userInfo.shoppingCard);
            } catch (error) {
                res.status(500).end();
            }
        },

    },

    post: {

        addToShoppingCard: async (req, res, next) => {
            const {user,isLoggedIn}= req
            const {productId} = req.body
            if (!isLoggedIn) {
                res.status(401).end()
                return
            }
            try {
                const userInfo= await userModel.findByIdAndUpdate(user._id, {
                    $push: {
                        "shoppingCard": productId
                    }
                },{new:true})
                res.status(200).json(userInfo);
            } catch (error) {
                res.status(500).end()
            }
        },

        deleteOneFromShoppingCart: async (req, res, next) => {
            const {user,isLoggedIn}= req
            const {productId} = req.body
            if (!isLoggedIn) {
                res.status(401).end()
                return
            }
            try {
                await userModel.bulkWrite([{
                        "updateOne": {
                            "filter": {
                                _id: user._id,
                                shoppingCard: productId
                            },
                            "update": {
                                "$set": {
                                    "shoppingCard.$": null
                                }
                            }
                        }
                    },
                    {
                        "updateOne": {
                            "filter": {
                                _id: user._id,
                                shoppingCard: null
                            },
                            "update": {
                                "$pull": {
                                    "shoppingCard": null
                                }
                            }
                        }
                    }
                ])

                const userInfo = await userModel.findById(user._id)                
                res.status(200).json(userInfo);

            } catch (error) {
                res.status(500).end()
            }
        },

        checkoutShoppingCard: async (req, res, next) => {
            const {user,isLoggedIn}=req
            if (!isLoggedIn) {
                res.status(401).end()
                return
            }
            try {
               const userInfo = await userModel.findByIdAndUpdate(user._id, 
                {
                    $set: {
                        "shoppingCard": []
                    }
                },
                {new: true});
                res.status(200).json(userInfo);
            } catch (error) {
                res.status(500).end()
            }
        },

        deleteAllFromShoppingCart: async (req, res, next) => {
            try {
                const {productId} = req.body
                const {user,isLoggedIn}=req
                if (!isLoggedIn) {
                    res.status(401).end()
                    return
                }
                const userInfo= await userModel.findByIdAndUpdate(user._id, {
                    $pull: {
                        "shoppingCard": productId
                    }
                },{new: true})
                res.status(200).json(userInfo);
            } catch (error) {
                res.status(500).end()
            }
        },
    }
}