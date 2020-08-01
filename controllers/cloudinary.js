const cloudinary = require('../utils/cloudinary')

module.exports = {
    post: {
        delete: async (req, res, next) => {
            try {  
                const {imageUrl}=req.body
                cloudinary.destroy(imageUrl)
                res.status(200).end()
            } catch (error) {
                res.status(500).end()
            }
        },
    }
}