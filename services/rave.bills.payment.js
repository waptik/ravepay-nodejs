var morx = require("morx");
const package = require('../package.json');
var q = require("q");
const axios = require('axios');


var spec = morx
  .spec()

  .build(
    "secret_key",
    "required:false, eg:FLWESCK-e634d14d9ded04eaf05d5b63a0a06d2f-X"
  )
  .build("service", "required:true, eg:fly_buy")
  .build("service_method", "required:true, eg:get")
  .build("service_version", "required:true, eg:v1")
  .build("service_channel", "required:true, eg:rave")
  .build("service_payload", 'required:false, eg:{"Country": "NG"}')
  .end();

function service(data, _rave) {

  axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
     "publicKey": _rave.getPublicKey(),
     "language": "NodeJs v2",
     "version": package.version,
     "title": "Incoming call",
         "message": "Bills Payment"
   })
  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = {}
            var params = validated.params;

            return params;
  })
    .then(params => {
     

      params.secret_key = _rave.getSecretKey();
    //   params.method = params.service_method;
      return _rave.request('v2/services/confluence', params);
    //   console.log(params);
    })
    .then(response => {
      // console.log(response);
      d.resolve(response);
    })
    .catch(err => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
