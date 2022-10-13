const configuration = require('../configuration');
const externalApiUrls = {
    'COUNTRY_NAME': configuration.restCountriesNameAPIUrl,
    'COUNTRY_CURRENCY': configuration.restCountriesCurrencyAPIUrl,
};

function getExternalAPIUrl(endpoint){
    return externalApiUrls[endpoint];
}

function getServerConfig(){
    return configuration.server;
}


function getLoggerConfig(){
    return configuration.logger;
}

function getTimeout(){
    return Number(configuration.timeout);
}

module.exports = {
    getExternalAPIUrl: getExternalAPIUrl,
    getServerConfig : getServerConfig, 
    getLoggerConfig : getLoggerConfig, 
    getTimeout:getTimeout
}