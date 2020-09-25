var morx = require('morx');
var q = require('q');
const package = require('../package.json');
const axios = require('axios');

var spec =  morx.spec()
				.build('token', 'required:false')
				.build('currency', 'required:false, eg:NGN')
				.build('country', 'required:false, eg:NG')
				.build('amount', 'required:true, eg:10') 
				.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
				.build('firstname', 'required:false, eg:lawal')
				.build('lastname', 'required:false, eg:garuba')
				.build('IP', 'required:true, eg:127.0.0.1')
				.build('narration', 'required:false, eg:89938910')  
				.build('txRef', 'required:true, eg:443342') 
				.build('meta', 'required:false')
				.build('device_fingerprint', 'required:false,eg:12233')
				.build('subaccounts', 'required:false')
				.end();

function service(data, _rave){
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v2",
         "version": package.version,
         "title": "Incoming call",
             "message": "Tokenized Card Charge"
       })

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {

		//console.log(params);
		params.SECKEY = _rave.getSecretKey();
		return _rave.request('flwv3-pug/getpaidx/api/tokenized/charge', params)
	})
	.then( response => {

		//console.log(response);
		d.resolve(response.body);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
}
service.morxspc = spec;
module.exports = service;
