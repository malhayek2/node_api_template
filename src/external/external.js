const winston = require('winston');
const axios = require('axios');

const resources = require('../resources');

const logger = winston.loggers.get('main');



function timestamp(){
    return new Date().getTime();
}


function sendLookUpCall(context, url, headers, resolve, reject) {
    const startTime = timestamp();
    axios.get(url, {
        timeout: resources.getTimeout(),
        headers: headers,
        validateStatus:  status => true
    }).then(function(httpResponse){
            let responseTime = timestamp() - startTime;
            logger.info('API response time %s', responseTime);
            logger.info('API status code %d', httpResponse.status);
            logger.info('API response headers %s', JSON.stringify(httpResponse.headers));
            logger.info('API response %s', JSON.stringify(httpResponse.data));
            resolve(httpResponse);
        })
        .catch(function(err){
            let responseTime = timestamp() - startTime;
            logger.info('API response time %s', responseTime);
            logger.error('API request failed failed: %s', err.stack);
            reject(err);
        });
        
}


module.exports = { sendLookUpCall: sendLookUpCall,
     timestamp : timestamp
 }
