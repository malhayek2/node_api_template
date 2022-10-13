class MockRequest{
    constructor(headers, body){
        this.headers = headers;
        this.body = body;
    }

    withMethod(method){
        this.method = method;
        return this;
    }

    withIsResult(isResult){
        this.isResult = isResult;
        return this;
    }

    withurlParmas(params){
        this.params = params;
        return this;
    }

    get(name){
        return this.headers[name];
    }

    is(type){
        this.isType = type;
        return this.isResult;
    }
}

module.exports = MockRequest;
