class ApiError extends Error {
    constructor(
        statusCode = 500,
        message = 'Internal Server Error',
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
        this.stack = stack
        this.success = false

        if(stack){
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}