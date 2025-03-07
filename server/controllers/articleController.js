const { Article } = require('../models');
const { GoogleGenerativeAI } = require('@google/generative-ai');

class ArticleController {
  static async getArticles(req, res, next) {
    try {
      const articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }
  static async getArticlesById(req, res, next) {
    const { id } = req.params;
    try {
      const article = await Article.findByPk(id);

      // console.log(article, '<<<<<<<<<<<<<<<<<<<<<<<');

      if (!article) {
        throw { name: 'NotFound' };
      }

      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
  //
  static async recommendationAi(req, res, next) {
    try {
      const genAI = new GoogleGenerativeAI(
        'AIzaSyCVklbAy6HrK-0JOztQyeJAY5q86nZQC88'
      );
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `Berikan saya 4 berita yang bagus untuk direkomendasikan, sertakan judul, deskripsi, dan URL gambar untuk setiap berita. Response must be a format JSON like this. 
          [
            {
              "title": ....,
              "image": using picsum only,
              "description": ....,
            }
          ]`

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      let array = text.split("[");
      let a = array[1].split("]")[0];
      const news = "[" + a + "]";
      const formattedRecommendations = JSON.parse(news);

      // console.log(formattedRecommendations,'<<<<<<<');
      
      res.status(200).json({
        message: 'This is our News Recommendation',
        recommendations: formattedRecommendations,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ArticleController;
