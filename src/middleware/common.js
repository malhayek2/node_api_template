const winston = require('winston');

const logger = winston.loggers.get('main');

function returnJsonResponse(res){
    return function (returnObject) {
        res.status(returnObject.status);
        res.set(returnObject.headers);
        res.json(returnObject.payload);
        res.end();
    }
}

function createContext(req, timestampGetter){
    const headers = {

    };
    return {body: req.body, urlParams: req.params, headers: headers, startTime: timestampGetter()}
}

function onJsonRequest(handler, external){
    return function(req, res){
        handler(createContext(req, external.timestamp), returnJsonResponse(res))
    }
}

module.exports = {
    onJsonRequest: onJsonRequest,
};
