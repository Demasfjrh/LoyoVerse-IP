const { Favorite, Article } = require('../models');

class FavoriteController {
  static async getFavorites(req, res, next) {
    try {
      const favorites = await Favorite.findAll({
        where: { 
          UserId: req.loginInfo.userId 
        },
        include: [
          { 
            model: Article,
            // Jika ingin filter artikel tambahan, bisa ditambahkan di sini
            // where: { /* kondisi tambahan */ }
          }
        ],
        attributes: ['id', 'UserId', 'ArticleId'], // Pilih atribut yang diinginkan
        order: [['createdAt', 'DESC']] // Urutkan dari yang terbaru
      });

      // Transform data untuk memastikan struktur yang benar
      const favoritesWithArticles = favorites.map(favorite => ({
        id: favorite.id,
        ArticleId: favorite.ArticleId,
        Article: favorite.Article // Pastikan huruf A kapital sesuai dengan include
      }));

      console.log('Favorites yang ditemukan:', JSON.stringify(favoritesWithArticles, null, 2));

      res.status(200).json(favoritesWithArticles);
    } catch (error) {
      console.error('Error di getFavorites:', error);
      next(error);
    }
  }

  // POST /favorites - Tambah artikel ke favorit
  static async createFavorite(req, res, next) {
    try {
      const { ArticleId } = req.body;
      const userId = req.loginInfo.userId;

      const article = await Article.findByPk(ArticleId);
      if (!article) throw { name: 'NotFound' };

      const existingFavorite = await Favorite.findOne({ where: { ArticleId, UserId: userId } });
      if (existingFavorite) throw { name: 'AlreadyFavorite' };

      const favorite = await Favorite.create({ ArticleId, UserId: userId });

      res.status(201).json(favorite);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /favorites/:id - Hapus artikel dari favorit
  static async deleteFavorite(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.loginInfo.userId;

      const favorite = await Favorite.findOne({ where: { id, UserId: userId } });
      if (!favorite) throw { name: 'NotFound' };

      await favorite.destroy();

      res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavoriteController;
