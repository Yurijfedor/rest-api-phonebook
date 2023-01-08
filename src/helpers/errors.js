class ValidationError extends Error {
    constructor(message) {
        super(message),
        this.status = 400
    }
}

class WrongParametersError extends Error {
    constructor(message) {
        super(message),
        this.status = 400
    }
}

class UpdatedFavoriteStatusError extends Error {
    constructor(message) {
        super(message),
        this.status = 404
    }
}

module.exports = {
    ValidationError,
    WrongParametersError,
    UpdatedFavoriteStatusError
}