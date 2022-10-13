class MockResponse{
    constructor(html, err, done){
        this.html = html;
        this.err = err;
        this.done = done;
        this.finished = false;
        this.locals = {};
    }

    status(code){
        this.statusCode = code;
        return this;
    }

    set(headers){
        this.headers = headers;
        return this;
    }

    json(payload){
        this.payload = payload;
        //this.headers['Content-Type'] = 'application/json';
        return this.send(payload);
    }

    render(view, options, callback){
        this.view = view;
        this.options = options;
        if (callback !== undefined && callback !== null) {
            callback(this.err, this.html);
        }
    }

    send(body){
        this.body = body;
        return this.end();
    }

    end(){
        if (!this.finished){
            this.finished = true;
            if (this.done !== null) {
                this.done(this);
            }
        }
        return this;
    }
}

module.exports = MockResponse;
