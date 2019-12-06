var accountNumber  = require('../lib/rave.virtualAccountNumber');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv');


chai.use(chaiAsPromised);

describe("#Rave Virtual Card Test", function () {

    var virtualAcctResp;

    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var accountNumberInstance = new accountNumber (ravebase);

 

        describe("#Rave Create Virtual Account Number test", function () {
            it("should return 'Response_code: 02' message ", function (done) {
                this.timeout(10000);
                var payload = {
                    "email": "user@example.com",
                    "seckey": process.env.SECRET_KEY,
                    "is_permanent": true
                }

                var result = accountNumberInstance.accountNumber(payload).then(resp => {
                    return resp.body.data;
                });

                expect(result).to.eventually.have.deep.property('response_code', '02').notify(done)
            });
        });
    });
