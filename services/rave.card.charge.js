var morx = require('morx');
var q = require('q');
var charge = require('./rave.charge');

// require('dotenv').config();
// var r = require('../lib/rave.base');
// var R = new r("", "", false)

var spec =  morx.spec()
				.build('cardno', 'required:true,validators:isNumeric, eg:5590131743294314')
				.build('currency', 'required:false, eg:NGN')
				.build('suggested_auth', 'required:false, eg:VBVSECURECODE') 
				.build('country', 'required:false, eg:NG')
				.build('settlement_token', 'required:false, eg:NG')
				.build('cvv', 'required:true, eg:544')   
				.build('amount', 'required:true, eg:10') 
				.build('phonenumber', 'required:false, eg:08034789190')
				.build('billingzip', 'required:false, eg:10105') 
				.build('expiryyear', 'required:true, eg:21') 
				.build('expirymonth', 'required:true, eg:02')  
				.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
				.build('firstname', 'required:false, eg:lawal')
				.build('lastname', 'required:false, eg:garuba')
				.build('IP', 'required:true, eg:127.0.0.1')
				.build('narration', 'required:false, eg:89938910') 
				.build('txRef', 'required:true, eg:443342') 
				.build('meta', 'required:false') 
				.build('pin', 'required:false, eg:3321') 
				.build('bvn', 'required:false, eg:1234567890') 
				.build('redirect_url', 'required:false')
				.build('charge_type', 'required:false, eg:recurring-monthly')  
				.build('device_fingerprint', 'required:false,eg:12233')
				.build('recurring_stop', 'required:false')
				.build('include_integrity_hash', 'required:false,eg:2017050')
				.end();

function service(data, _rave){

	var d = q.defer();
	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return charge(params, _rave);

	})
	.then( resp => {

		d.resolve(resp);

	})
	.catch( err => {

		d.reject(err);

	});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;

// payload = {
// 		"cardno": "5438898014560229",
//         "cvv": "564",
//         "expirymonth": "10",
//         "expiryyear": "20",
//         "currency": "NGN",
//         "country": "NG",
//         "amount": "10",
//         "email": "user@gmail.com",
//         "phonenumber": "0902620185",
//         "firstname": "temi",
//         "lastname": "desola",
//         "IP": "355426087298442",
//         "txRef": "MC-" + Date.now(),// your unique merchant reference
//         "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
//         "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
//         "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
// 	}


// service(payload, R).then((err, res) => {
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(res)
// 	}
// }).catch(err => {
// 	console.log(err)
// })