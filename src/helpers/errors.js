class ApiPhonebookError extends Error {
    constructor(message) {
        super(message),
        this.status = 400
    }
}

class ValidationError extends ApiPhonebookError {
    constructor(message) {
        super(message),
        this.status = 400
    }
}


class WrongParametersError extends ApiPhonebookError {
    constructor(message) {
        super(message),
        this.status = 400
    }
}

class NotAuthorizedError extends ApiPhonebookError {
    constructor(message) {
        super(message),
        this.status = 401
    }
}

class EmailInUseError extends ApiPhonebookError {
    constructor(message) {
        super(message),
        this.status = 409
    }
}


class UpdatedFavoriteStatusError extends ApiPhonebookError {
    constructor(message) {
        super(message),
        this.status = 404
    }
}

module.exports = {
    ApiPhonebookError,
    ValidationError,
    WrongParametersError,
    UpdatedFavoriteStatusError,
    NotAuthorizedError,
    EmailInUseError
}