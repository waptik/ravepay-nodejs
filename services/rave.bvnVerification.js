var morx = require('morx');

var q = require('q');


var spec = morx.spec()

    .build('bvnnumber', 'required:false, eg:12345678901')
    .end();

function service(data, _rave) {

    var d = q.defer();

    q.fcall(() => {

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            var params = validated.params;
            console.log(params);
            
            return params;

        })
        .then(params => {

            

            params.seckey = _rave.getSecretKey();
            params.method = "GET"


            return _rave.request('/v2/kyc/bvn',params)
        })
        .then(response => {

            console.log(response);
            d.resolve(response);


        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;



}
service.morxspc = spec;
module.exports = service;

