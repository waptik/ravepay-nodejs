require('dotenv').config({
    path: '../.env'
});

var settlements = require('../lib/rave.settlements');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Settlement Test", function () {

   
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(public_key, secret_key, production_flag);
    var settlementInstance = new settlements(ravebase);


        describe("#Rave List Settlement test", function () {
            it("should return Status message ",async function () {
                this.timeout(12000);
                var payload = {
                    "seckey":secret_key,
                    "from": "2019:01:01",
                    "to": "2020:09:30",
                    "page": "20"
                }
                var resp = await settlementInstance.list(payload);


               return expect(resp.body).to.have.property('status', 'success')
            });
        });

        // describe("#Rave Fetch Settlement test", function () {
        //     it("should return 'request' message ",async function () {
        //         this.timeout(10000);
        //         var payload = {
        //             "seckey":secret_key,
        //             "from": "2018:01:21",
        //             "to": "2019:12:21",
        //             "id": "233940" 
        //         }
        //         var resp = await settlementInstance.fetch(payload);


        //         return expect(resp.body).to.be.a('string')
        //     });
        // });
    });


