const { Favorite, Article } = require('../models')

class FavoriteController {
    static async getFavorites(req, res, next) {
    try {
          const favorites = await Favorite.findAll()
          res.status(200).json(favorites)
    } catch (error) {
        next(error)
    }
  }
  static async createFavorite(req, res, next) {
    try {
        // req.loginInfo
    
      const { ArticleId } = req.body

      const article = await Article.findByPk(ArticleId)

      if (!article) {
        throw { name: 'NotFound' }
      }

      const validate = await Favorite.findOne({ where: { ArticleId, UserId: req.loginInfo.userId } })

      if (validate) {
          console.log(validate, 'ini validate');
        throw { name: 'AlreadyFavorite' }
      }



      const favorite = await Favorite.create({ ArticleId, UserId: req.loginInfo.userId })

      res.status(201).json(favorite)
    } catch (error) {
      next(error)
    }
  }
  static async deleteFavorite(req, res, next) {
    try {
      const { id } = req.params
      const favorite = await Favorite.findByPk(id)
      if (!favorite) {
        throw { name: 'NotFound' }
      }
      await Favorite.destroy({ where: { id } })
      
      res.status(200).json({ message: 'Favorite deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = FavoriteController
