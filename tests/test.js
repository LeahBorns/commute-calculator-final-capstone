const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();


const _require = require('../config'),
      DATABASE_URL = _require.DATABASE_URL;

const activityCategory = require('../models/activityCategory');

const _require3 = require('../server'),
      closeServer = _require3.closeServer,
      runServer = _require3.runServer,
      app = _require3.app;


chai.use(chaiHttp);




//unit test for activityCategory function
describe('activityCategory', function () {

    before(function () {
        return runServer(DATABASE_URL);
    });

    //testing the normal case
    it('should select chosen category', function () {
        return chai.request(app).get('/category/show/aaa').then(function (res) {

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
        });
    });

    it('should select all activities', function () {
        return chai.request(app).get('/activity/show').then(function (res) {

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
        });
    });

    it('should select a activity based on the username', function () {
        return chai.request(app).get('/activity-feed-by-username/aaa').then(function (res) {

            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body.should.have.length.of.at.least(1);

            res.body.forEach(function (item) {
                item.should.be.a('object');
                item.should.include.keys('username', 'name', 'points', 'description', 'image');
            });
        });
    });

    after(function () {
        return closeServer();
    });
});
