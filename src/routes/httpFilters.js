function onlyPostJson(req, res, next) {
    if (req.method === 'POST' && !req.is('json')){
        res.status(415).end();
        return;
    }
    next();
}

function inProduction(resources){
     resources.env === 'prod';
}

function returnErrorInDev(resources) {
    return function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = inProduction(resources) ? {} : err;
        const status = err.status || 500;
        res.status(status);
        res.render('error', {
            message: 'Error',
            error: {
                status: status,
                stack: inProduction(resources) ? '' : err.stack
            }
        });
        next();
    }
}

module.exports = {
    onlyPostJson: onlyPostJson,
    returnErrorInDev: returnErrorInDev
};
