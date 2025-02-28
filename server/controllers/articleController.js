const { Article } = require('../models')
const { GoogleGenerativeAI } = require('@google/generative-ai')


class ArticleController {
  static async getArticles(req, res) {
    try {
      const articles = await Article.findAll()
      res.status(200).json(articles)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  static async getArticlesById(req,res,next){
    const { id } = req.params
    try {
      const article = await Article.findByPk(id)

      console.log(article, "<<<<<<<<<<<<<<<<<<<<<<<")

      if (!article) {
        throw { name: 'NotFound' }
      }

      res.status(200).json(article)
    } catch (error) {
      next(error)
    }
  }

  static async recommendationAi(req,res,next){
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyCVklbAy6HrK-0JOztQyeJAY5q86nZQC88');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Kasih saya 10 rekomendasi berita apa yang paling ngehits ini di kategori politik, olahraga, ekonomi, teknologi, hiburan, setiap kali anda mengirim, jangan kirimkan yang sama dan tolong kelompokan berdasarkan kategori di atas dan berikan dalam bentuk json tanpa tag json dan tanpa enter";
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.candidates[0].content.parts[0].text;
        console.log(text);

        res.status(200).json({
            message: 'Our Recommendation article on every category',
            text,
        })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = ArticleController
