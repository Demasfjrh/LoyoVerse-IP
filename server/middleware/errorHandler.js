const errorHandler = (err, req, res, next) => {
    console.log(err)
    let message = 'Internal Server Error'
    let status = 500

    if (err.name === 'Unauthorized') {
        message = 'You gotta login first'
        status = 401
    }

    if (err.name === 'SequelizeValidationError') {
        message = err.errors.map(el => el.message).join(', ')
        status = 400
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        message = err.errors.map(el => el.message).join(', ')
        status = 400
    }

    if (err.name === 'LoginFailed') {
        message = 'Invalid email or password'
        status = 401
    }

    if (err.name === 'Forbidden') {
        message = 'You are not allowed to access this resource'
        status = 403
    }

    if (err.name === 'NotFound') {
        message = 'Resource not found'
        status = 404
    }
    
    if (err.name === 'AlreadyFavorite') {
        message = 'You already favorited this article'
        status = 400
    }

    res.status(status).json({ message })
}

module.exports = errorHandler
