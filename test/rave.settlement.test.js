var settlement = require('../lib/rave.settlements');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv');


chai.use(chaiAsPromised);

describe("#Rave Settlement Test Test", function () {

    var virtualcardResp;
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;

    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var settlementInstance = new settlement(ravebase);

    describe("#Rave List settlement test", function () {
        it("should return a status success response", function (done) {
            this.timeout(10000);
            var payload = {
                "seckey":secret_key,
                "from": "2018:01:21",
                "to": "2019:12:21",
                "page": "20",
                "subaccountid":"RS_C3FCBECF928B4B33B9C3BC74A357A9E5"
                
            }

            var result = settlementInstance.list(payload).then(resp => {
                return resp.body;
            });

            expect(result).to.eventually.have.property("status", "success").notify(done)
        });

       

    });
});