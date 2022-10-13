require("dotenv").config();

module.exports = {
    restCountriesCurrencyAPIUrl : process.env.restCountriesCurrencyAPIUrl,
    restCountriesNameAPIUrl: 'https://restcountries.com/v3.1/name/', 
    server: {
        httpEnabled: true,
        httpPort: 3030
    }, 
    logger: {
        folder: '/var/log/node-app-logs',
        level: 'info',
        maxFiles: 14
    },
    timeout: 9000
}