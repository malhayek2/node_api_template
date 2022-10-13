const winston = require('winston');
const applicationError = require('./applicationError');
const errors = require('../util/errors');
const external = require('../external/external');
const resources = require('../resources');
const messages = require('../util/messages');
const logger = winston.loggers.get('main');


function returnErrorResponse(context, callback) {
    return function (exception) {
        console.log("ERRROR PROCESSING" + exception)
        if (!(exception instanceof applicationError.ApplicationError)) {
            logger.error('Unexpected error: %s', exception.stack);
            exception = applicationError.create(exception, errors.createServerErrorResponse);
        }
        context.err = exception.cause;
        const response = exception.builder(context);
        returnResponse(context, callback, response);
    }
}

function inputValidation(context) {
    return function () {
        if (context.urlParams.item_id === undefined || context.urlParams.item_id === null || context.urlParams.item_id == '') {
            logger.warning('invalid input');
            throw applicationError.create(new Error('invalid request'), errors.createInvalidInputResponse(context));
        }
        logger.info('Incoming request, process for %s ', context.urlParams.item_id);
        return new Promise(sendLookupByCountryName(context));

    }
}


function returnResponse(context, callback) {
    return function (returnObject) {
        returnResponse(context, callback, returnObject);
    }
}

function sendLookupByCountryName(context) {
    return function (resolve, reject) {
        let url = resources.getExternalAPIUrl('COUNTRY_NAME') + context.urlParams.item_id;
        const headers = {
            'Content-Type': 'application/json'
        }
        external.sendLookUpCall(context, url, headers, resolve, function (err) {
            logger.warning("External Call Failed");
            reject(applicationError.create(new Error("unexpected response"), errors.createNetworkErrorResponse(context)));
        });
    }
}


function handleResponse(context) {
    return function (httpResponse) {
        const httpResponseCode = httpResponse.status;
        if ([200,201].includes(httpResponseCode)) {
            logger.info('%s. Success');
            const successResponse = {
                payload : httpResponse.data, 
                status : httpResponseCode,
                headers:{

                }
            }
            return successResponse;
        } else {
            logger.info('Error Processing API Response status code %s' , httpResponseCode);
            return errors.createCountryNotFound();
        }
    }
}

function returnCompleteResponse(context, callback) {
    return function (returnObject) {
        returnResponse(context, callback, returnObject);
    }
}

function returnResponse(context, callback, returnObject) {
    logger.info('Sending page response status: %d', returnObject.status);
    logger.info('Sending page response headers: %s', JSON.stringify(returnObject.headers));
    logger.info('Sending page response payload: %s', JSON.stringify(returnObject.payload));
    logger.info('Server Response time', external.timestamp() - context.startTime);
    callback(returnObject);
}

function requestHandler(resources) {
    return function (context, returnResponse) {
        context.resources = resources;
        Promise.resolve()
            .then(inputValidation(context))
            .then(handleResponse(context))
            .then(returnCompleteResponse(context, returnResponse))
            .catch(returnErrorResponse(context, returnResponse));
    }
}

function countryRequestHandler(resources) {
    return requestHandler(resources);
}

module.exports = {
    countryRequestHandler: countryRequestHandler,
}