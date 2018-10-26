var morx = require('morx');
var charge = require('./rave.charge');
var q = require('q');
// var r = require('../lib/rave.base');
// var R = new r("FLWPUBK-a5715a67d24e61ce3e7bf79ae22ef524-X", "FLWSECK-6577e947f692e979e2d306ab4ce0a282-X", false)


//This allows you send bulk transfers

var spec =  morx.spec()
                .build('bulk_data', 'required:true, eg:{ "Bank":"044","Account Number":"0690000032"},{"Bank":"044","Account Number":"0690000032"}')
                .end();


function service(data, _rave){

    var d = q.defer();
    q.fcall( () => {

        var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        console.log(params)
        // params.country = params.country || "NG";
        _rave.params = params
        return  (_rave);

    })
    .then((_rave) => {
        _rave.params.seckey = _rave.getSecretKey();  
        return _rave.request('v2/gpx/transfers/create_bulk', _rave.params)
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
//     "seckey":"FLWSECK-6577e947f692e979e2d306ab4ce0a282-X",
//     "title":"May Staff Salary",
//     "bulk_data":[
//         {
//           "Bank":"044",
//           "Account Number": "0690000032",
//           "Amount":500,
//           "Currency":"NGN",
//           "Narration":"Bulk transfer 1",
//           "reference": "mk-82973029"
//       },
//       {
//           "Bank":"044",
//           "Account Number": "0690000034",
//           "Amount":500,
//           "Currency":"NGN",
//           "Narration":"Bulk transfer 2",
//           "reference": "mk-283874750"
//       }
//     ]
//   }

// service(payload, R).then((err, res) => {
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(res)
// 	}
// }).catch(err => {
// 	console.log(err)
// })
