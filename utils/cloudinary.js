var cloudinary = require('cloudinary').v2

function destroy(imageUrl) {
    const regex = /(\w+).jpg/g;
    const match = regex.exec(imageUrl);
    const cloudinaryImageId = match[1];
    cloudinary.uploader
        .destroy(cloudinaryImageId, function(err,result){console.log('Image delete result: '+ result.result)})
}

module.exports = {
    destroy
}