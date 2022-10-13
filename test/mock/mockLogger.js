class MockLogger{
    constructor(){
        this.logs = [];
    }

    info(message, ...meta){
        this.logs.push({level: 'info', message: message, meta: meta});
    }

    warn(message, ...meta){
        this.logs.push({level: 'warn', message: message, meta: meta});
    }

    error(message, ...meta){
        this.logs.push({level: 'error', message: message, meta: meta});
    }
}

module.exports = MockLogger;
