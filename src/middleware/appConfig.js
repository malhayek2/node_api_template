const express = require('express');
const winston = require('winston');

const serviceRouter = require('../routes/serviceRouter');
const errorMessages = require('../util/errors');
const logger = winston.loggers.get('main');

function configExpress(app) {
    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
}

function configMiddleware(app) {
    configExpress(app);


    app.use('/countries', serviceRouter);
    app.use((req, res, next) => {
        logger.info("Incoming request %s", req.method);
        logger.info("Requested URL %s", req.originalUrl);
        next();
    });


    app.use(function (err,req, res, next) {
        const notFoundResponse = errorMessages.createInvalidPathError();
        res.status(notFoundResponse.status) || 500;
        res.json(notFoundResponse.payload);
        res.end();
        return res;
    });
}

module.exports = {
    config: configMiddleware
};
