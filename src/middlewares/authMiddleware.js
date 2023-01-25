const jwt = require('jsonwebtoken')
const {NotAuthorizedError} = require('../helpers/errors')

const authMiddleware = (reg, res, next) => {
    const [tokenType, token] = reg.headers['authorization'].split(' ')
    if (!token) {
        next(new NotAuthorizedError('Please, provide a token'))
    }
    if (tokenType !== 'Bearer') {
        next(new NotAuthorizedError('Please provide the correct token type'))
    }
    try {
        const user = jwt.decode(token, process.env.JWT_SECRET)
        reg.token = token
        reg.user = user
        next()
    } catch (error) {
        next(new NotAuthorizedError('Invalid token'))
    }
    }

module.exports = {
    authMiddleware
}