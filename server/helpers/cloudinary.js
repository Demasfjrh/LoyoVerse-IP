const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dherwbcru',
    api_key: '451499873678196',
    api_secret: '5xXCjoQAvwzJxGdn9ayxslj30fI'
})

module.exports = cloudinary