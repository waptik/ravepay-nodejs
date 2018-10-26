var morx = require('morx');
var q = require('q');
// var r = require('../lib/rave.base');
// var R = new r("FLWPUBK-a5715a67d24e61ce3e7bf79ae22ef524-X", "FLWSECK-6577e947f692e979e2d306ab4ce0a282-X", false)

//This allows you fetch all transfers

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
		_rave.params.method = "GET"; 
        return _rave.request('v2/gpx/transfers', _rave.params)
        
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
// }).catch(err => {
// 	console.log(err)
// })