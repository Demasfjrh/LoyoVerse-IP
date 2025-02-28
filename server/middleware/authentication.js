const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            throw { name: 'Unauthorized' }
        }

        const token = authorization.split(' ')[1]

        if (!token) {
            throw { name: 'Unauthorized' }
        }

        
        const payload = verifyToken(token)

        const user = await User.findOne({ where: { email: payload.email } })

        if (!user) {
            throw { name: 'Unauthorized' }
        }

        req.loginInfo = {
            userId: user.id,
            email: user.email,
            UserName: user.UserName,
            imgUrl: user.imgUrl
        }
        next()
  } catch (error) {
    console.log(error)

    let message = 'Internal Server Error'
    let status = 500
    if (error.name === 'Unauthorized') {
        message = 'You gotta login first'
        status = 401
    }
    res.status(status).json({ message })
  }
}

module.exports = authentication

