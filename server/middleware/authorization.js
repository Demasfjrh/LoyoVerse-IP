const e = require('express')
const { Favorite } = require('../models')

const authorization = async (req, res, next) => {
    const { userId } = req.loginInfo
    try {
        const { id } = req.params
        const favorite = await Favorite.findOne({ where: { id: id } })

        if (!favorite) {
            throw { name: 'NotFound' }
        }

        if (favorite.UserId !== userId) {
            throw { name: 'Forbidden' }
        }

        next()
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}



module.exports = authorization
