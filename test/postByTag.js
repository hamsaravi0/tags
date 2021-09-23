
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Errors = require('../middleware/ErrorTypes');
chai.use(chaiAsPromised);

const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('Unit Tests', () => {
    it('ping returns true', (done) => {
        chai.request(server)
            .get('/api/ping')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.property("success");
                expect(res.body.success).to.be.equal(true);
                done();
            })
    });
    it('no tag present', () => {
        chai.request(server)
            .get('/api/posts').should.eventually.throw(Errors.TagsDNEError);
    });
    it('invalid sortBy', () => {
        chai.request(server)
            .get('/api/posts?tags=history&sortBy=0').should.eventually.throw(Errors.SortByInvalidError);
    });
    it('invalid direction', () => {
        chai.request(server)
            .get('/api/posts?tags=history&sortBy=like&direction=0').should.eventually.throw(Errors.DirectionInvalidError);
    });
    it('post by tag returns true', (done) => {
        chai.request(server)
            .get('/api/posts?tags=history,tech')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

});
