var morx = require('morx');
var q = require('q');
var charge = require('./rave.charge');

// require('dotenv').config();
// var r = require('../lib/rave.base');
// var R = new r("", "", false)

var spec =  morx.spec()
				.build('otp', 'required:true, eg:5590')
				.build('transaction_reference', 'required:false, eg:FLW-MOCK-17e915bec5a86f4b92b358ce6d72144e') 
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {

		params.PBFPubKey = _rave.getPublicKey();  
		return _rave.request('flwv3-pug/getpaidx/api/validatecharge', params)
	})
	.then( response => {

		//console.log(response);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;

// payload = {
// 	"otp": "12345",
// 	"transaction_reference": "FLW-MOCK-17e915bec5a86f4b92b358ce6d72144e",
// }

// service(payload, R).then((err, res) => {
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(res)
// 	}
// }).catch(err => {
// 	console.log(err)
// })