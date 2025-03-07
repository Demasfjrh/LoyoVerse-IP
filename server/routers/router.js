const router = require('express').Router()
const UserController = require('../controllers/userController')
const ArticleController = require('../controllers/articleController')
const FavoriteController = require('../controllers/favoriteController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const upload = require('../helpers/multer')
const uploadMiddleWare = upload.single('imgUrl')

router.post('/google-login', UserController.googleLogin)
router.post('/login', UserController.login)
router.post('/register', UserController.register)


router.get('/articles', ArticleController.getArticles)
router.get('/article/:id', ArticleController.getArticlesById)
router.get('/recomendation', ArticleController.recommendationAi)

router.use(authentication)
router.get('/profile', UserController.getProfile)

// router.put('/profile', UserController.updateProfile)
router.patch('/profile', uploadMiddleWare, UserController.uploadImage)
router.get('/favorites', FavoriteController.getFavorites)
router.post('/favorites', FavoriteController.createFavorite)
router.delete('/favorites/:id',authorization, FavoriteController.deleteFavorite)

module.exports = router
