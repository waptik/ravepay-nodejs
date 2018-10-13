var transfer = require('../lib/rave.transfer');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("#Rave Transfer test", function() {
    var transferResp;
    var ravebase = new base("FLWPUBK-3899c4a996764a5d061ede002fa390f3-X", "FLWSECK-ff7445bbd6971fabbf987975afdc85ea-X", false);
    var transferInstance = new transfer(ravebase);
    // console.log(transferInstance);

    describe("#Rave Transfer leg test", function () {
        it("should return a status success response", function(done) {
            this.timeout(10000);
            var payload = {
                "account_number": "0690000031",
                "account_bank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "e.ikedieze@gmail.com",
                "phonenumber": "08056552980",
                "firstname": "ikedieze",
                "lastname": "ndukwe",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "secKey": "FLWSECK-ff7445bbd6971fabbf987975afdc85ea-X",
                "reference": "mk-0989098-jk"
            }
            transferResp=[];
            transferInstance.initiate(payload).then(resp => {
                transferResp = resp;
                if (resp.status == "success") {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })
    });

    describe("#Rave bulk transfer test", function () {
        it("should return a status success response", function(done) {
            this.timeout(10000);
            var payload = {
                "seckey":"FLWSECK-0b1d6669cf375a6208db541a1d59adbb-X",
                "title":"May Staff Salary",
                "bulk_data":[
                    {
                      "Bank":"044",
                      "Account Number": "0690000032",
                      "Amount":500,
                      "Currency":"NGN",
                      "Narration":"Bulk transfer 1",
                      "reference": "mk-82973029"
                  },
                  {
                      "Bank":"044",
                      "Account Number": "0690000034",
                      "Amount":500,
                      "Currency":"NGN",
                      "Narration":"Bulk transfer 2",
                      "reference": "mk-283874750"
                  }
                ]
              }
            transferResp=[];
            transferInstance.bulk(payload).then(resp => {
                transferResp = resp;
                if (resp.status == "success") {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })
    })
})


