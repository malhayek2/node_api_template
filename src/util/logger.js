const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-syslog');
const util = require('util');

const resources = require('../resources');
const logUtil = require('./logUtil');

const { format, transports, loggers } = winston;

const mainFileTransport = new (transports.DailyRotateFile)({
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    filename: 'applicationName.%DATE%.log',
    dirname: resources.getLoggerConfig().folder,
    maxFiles: resources.getLoggerConfig().maxFiles
});


function getTransports(start){
    const loggerConfig = resources.getLoggerConfig();
    if (loggerConfig.syslog !== undefined && loggerConfig.syslog !== null){
        for (let i = 0; i < loggerConfig.syslog.length; i++){
            start.push(new transports.Syslog(loggerConfig.syslog[i]));
        }
    }
    return start;
}

function addPrefix(info){
    let prefix = util.format('%s %s ', logUtil.currentTime(), info.level.toUpperCase());
    const fileLine = logUtil.getFileLine(__dirname, new Error().stack);
    if (fileLine !== null){
        prefix = fileLine;
    }

    info["filelocation"] = (`${prefix}`);
    return info;
}

function init() {
    Error.stackTraceLimit = Infinity;

    loggers.add('main', {
        levels: winston.config.syslog.levels,
        level: resources.getLoggerConfig().level,
        format: format.combine(
            format.splat(),
            format(addPrefix)(),
            format.timestamp(),
            format.json()            
        ),
        transports: getTransports([mainFileTransport])
    });

}

module.exports = init ;
module.exports.addPrefix = addPrefix;