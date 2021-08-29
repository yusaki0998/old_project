process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require("mongoose");
const server = require('../server');
const User = require('../dbaccess/user-model');
chai.use(chaiHttp);

describe('Users API', () => {

    describe('/POST login', () => {
        it('it should login user', (done) => {
            chai.request('http://localhost:8080/api/v1/users')
            .post('/login')
            .send({
                'email': 'admin@gmail.com',
                'password': '1'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Login success!')
                res.body.data.should.have.property('token')
                done()
            })
        })
    })
})