const assert = require('chai').assert;
const expect = require('chai').expect;

const httpFilters = require('../../src/routes/httpFilters');
const MockRequest = require('../service/mockRequest');
const MockResponse = require('../service/mockResponse');
const MockResources = require('../service/mockResources');

function next(returnObject){
    return function(){
        returnObject.count++;
    }
}

describe('Only post JSON', function () {
    it('Should do nothing if method is GET', function () {
        const returnObject = {count: 0};
        const req = new MockRequest({}, '').withMethod('GET').withIsResult(false);
        const res = new MockResponse(null, null, null);
        httpFilters.onlyPostJson(req, res, next(returnObject));
        assert.equal(returnObject.count, 1);
    });

    it('Should do nothing if method is POST & format is JSON', function () {
        const returnObject = {count: 0};
        const req = new MockRequest({}, '').withMethod('POST').withIsResult(true);
        const res = new MockResponse(null, null, null);
        httpFilters.onlyPostJson(req, res, next(returnObject));
        assert.equal(returnObject.count, 1);
    });

    it('Should return 415 if method is POST & format is not JSON', function () {
        const returnObject = {count: 0};
        const req = new MockRequest({}, '').withMethod('POST').withIsResult(false);
        const res = new MockResponse(null, null, null);
        httpFilters.onlyPostJson(req, res, next(returnObject));
        assert.equal(returnObject.count, 0);
        assert.equal(res.statusCode, 415);
    });

});

describe('Return error', function () {
    it('Should return error message in DEV', function () {
        const returnObject = {count: 0};
        const resources = new MockResources();
        const res = new MockResponse(null, null, null);
        const err = {message: 'abc', stack: 'def'};
        httpFilters.returnErrorInDev(resources)(err, null, res, next(returnObject));
        const expectedLocals = {message: 'abc', error: err};
        const expectedOptions = {message: 'Error', error: {status: 500, stack:'def'}};
        assert.equal(returnObject.count, 1);
        assert.equal(res.statusCode, 500);
        assert.deepEqual(res.locals, expectedLocals);
        assert.equal(res.view, 'error');
        assert.deepEqual(res.options, expectedOptions);
    });

    it('Should return error message in DEV & status code if there is one', function () {
        const returnObject = {count: 0};
        const resources = new MockResources();
        const res = new MockResponse(null, null, null);
        const err = {message: 'abc', stack: 'def', status: 401};
        httpFilters.returnErrorInDev(resources)(err, null, res, next(returnObject));
        const expectedLocals = {message: 'abc', error: err};
        const expectedOptions = {message: 'Error', error: {status: 401, stack:'def'}};
        assert.equal(returnObject.count, 1);
        assert.equal(res.statusCode, 401);
        assert.deepEqual(res.locals, expectedLocals);
        assert.equal(res.view, 'error');
        assert.deepEqual(res.options, expectedOptions);
    });

    it('Should not return error message in PROD', function () {
        const returnObject = {count: 0};
        const resources = new MockResources();
        resources.payPageEnv = 'test';
        const res = new MockResponse(null, null, null);
        const err = {message: 'abc', stack: 'def'};
        httpFilters.returnErrorInDev(resources)(err, null, res, next(returnObject));
        const expectedLocals = {message: 'abc', error: {}};
        const expectedOptions = {message: 'Error', error: {status: 500, stack:''}};
        assert.equal(returnObject.count, 1);
        assert.equal(res.statusCode, 500);
        assert.deepEqual(res.locals, expectedLocals);
        assert.equal(res.view, 'error');
        assert.deepEqual(res.options, expectedOptions);
    });

    it('Should return error message in PROD & status code if there is one', function () {
        const returnObject = {count: 0};
        const resources = new MockResources();
        resources.payPageEnv = 'prod';
        const res = new MockResponse(null, null, null);
        const err = {message: 'abc', stack: 'def', status: 401};
        httpFilters.returnErrorInDev(resources)(err, null, res, next(returnObject));
        const expectedLocals = {message: 'abc', error: {}};
        const expectedOptions = {message: 'Error', error: {status: 401, stack:''}};
        assert.equal(returnObject.count, 1);
        assert.equal(res.statusCode, 401);
        assert.deepEqual(res.locals, expectedLocals);
        assert.equal(res.view, 'error');
        assert.deepEqual(res.options, expectedOptions);
    });

});

