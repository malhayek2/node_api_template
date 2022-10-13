const messages = require('./messages');
function createInvalidInputResponse(context) {
    return {
        status: 400,
        payload:{
            error: {
                code: 'invalid_input',
                message: "invalid input"
            }
        },
        headers: {
            
        }
    };
}

function createValidationErrorResponse(context) {
    return {
        status: 400,
        payload: {
            error: {
                code: 'invalid_input',
                message: context.err.message
            }
        }
    };
}

function createServerErrorResponse(context) {
    return {
        status: 500,
        payload: {
            error: {
                code: 'server_error',
                message: messages.errors.INTERNAL_SERVER_ERROR_MESSAGE
            }
        }
    };
}

function createNetworkErrorResponse(context) {
    return {
        status: 503,
        payload: {
            error: {
                code: 'network_error',
                message: messages.errors.SERVICE_UNAVAILABLE
            }
        }
    };
}

function createAuthenticationFailedResponse(context) {
    return {
        status: 401,
        payload: {
            error: {
                code: 'authentication_failed',
                message: messages.errors.AUTHENTICATION_FAILED,
            }
        }
    };
}

function createForbiddenResponse(context) {
    return {
        status: 403,
        payload: {
            error: {
                code: 'forbidden',
                message: messages.errors.FORBIDDEN
            }
        }
    }
}

function createInvalidPathError(){
    return {
        status : 404, 
        payload : {
            error : {
                code : 'not found',
                message : messages.errors.NOT_FOUND
            }
        }

    }
}

function createCountryNotFound(){
    return {
        status : 404, 
        payload : {
            error : {
                code : 'not found',
                message : 'Cannot find requested country, please check list below'
            }, 
            detail : 'https://restcountries.com/'
        }

    }
}

module.exports = {
    createNetworkErrorResponse: createNetworkErrorResponse,
    createServerErrorResponse: createServerErrorResponse,
    createInvalidInputResponse: createInvalidInputResponse,
    createValidationErrorResponse: createValidationErrorResponse,
    createAuthenticationFailedResponse: createAuthenticationFailedResponse, 
    createForbiddenResponse : createForbiddenResponse, 
    createInvalidPathError : createInvalidPathError, 
    createCountryNotFound : createCountryNotFound
}
