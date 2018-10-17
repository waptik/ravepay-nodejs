var morx = require('morx');
var q = require('q');
// var r = require('../lib/rave.base');
// var R = new r("FLWPUBK-3899c4a996764a5d061ede002fa390f3-X", "FLWSECK-ff7445bbd6971fabbf987975afdc85ea-X", false)

//This retrieves the fee for a transfer

var spec =  morx.spec()  
				.build('__n', 'required:false, eg:NGN')  
				.end();

function service(_rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(spec, _rave.MORX_DEFAULT);
        var params = validated.params; 
        // console.log(params)
        _rave.params = params
        return _rave

	})
	.then( _rave  => {
		 
        _rave.params.seckey = _rave.getSecretKey(); 
        console.log(_rave.params.seckey)
		_rave.params.method = "GET"; 
        return _rave.request('v2/gpx/transfers/fee', _rave.params)
        
	})
	.then( response => {

		console.log(response);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;

// service(R).then((err, res) => {
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(res)
// 	}
// }).catch((err)=>{
// 	console.log(err)
// })