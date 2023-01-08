const {ValidationError, WrongParametersError, UpdatedFavoriteStatusError} = require('./errors')

const asyncWrapper = (controller) => {
    return (reg, res, next) => {
        controller(reg, res).catch(next)
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError || err instanceof WrongParametersError || err instanceof UpdatedFavoriteStatusError) {
    return res.status(err.status).json({message: err.message})
}
  res.status(500).json({ message: err.message })
}

module.exports = {
    asyncWrapper,
    errorHandler
}