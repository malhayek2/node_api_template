
const proxyquire = require('proxyquire');
const express = require('express');
const request = require('supertest');

const { NotFound } = require('http-errors');

describe('Middleware Test', function () {
    var body = {'id' : '001',  'name' : 'test'};
    var appConfig = proxyquire('../middleware/appConfig.js', { '../configuration.js': configuration });
    var app = express();
    appConfig.config(app);
    it('Should response with 404 invalid request', function () {
        const fakeRequest = { 'id': '01', 'name': 'find bugs' };
        request(app)
            .post('http://localhost:8080/countries/')
            .send(fakeRequest)
            .expect(404, NotFound)
    })


    it('Should response with 404 for invalid resource', function () {
        request(app)
            .post('http://localhost:8080/cities/')
            .send(body)
            .expect(400, NotFound)
    })

});