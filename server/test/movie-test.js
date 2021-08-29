process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require("mongoose");
const server = require('../server');
const Movie = require('../dbaccess/movie-model');
chai.use(chaiHttp);

describe('Movies API', () => {

    describe('/GET ongoing movies', () => {
        it('it should GET all ongoing movies', (done) => {
            chai.request('http://localhost:8080/api/v1/movies')
            .get('/ongoing')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('All ongoing movies found')
                res.body.data.should.be.a('array');
                done()
            });
        })
    })

    describe('/GET comingsoon movies', () => {
        it('it should GET all comingsoon movies', (done) => {
            chai.request('http://localhost:8080/api/v1/movies')
            .get('/comingsoon')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('All coming soon movies found')
                res.body.data.should.be.a('array');
                done()
            })
        })
    })
})