const { format, transports, loggers, config } = require('winston');

function initLogger() {
    loggers.add('main', {
        levels: config.syslog.levels,
        level: 'info',
        format: format.combine(
            format.splat(),
            format.simple()
        ),
        transports: [
            new transports.Console()
        ]
    });
}

module.exports = {
    initLogger: initLogger
};
