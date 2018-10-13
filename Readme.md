# Ravepay Nodejs Library v1.0.0

## Ravepay Services exposed by the library

- Account Charge 
- Card Charge
- USSD Charge
- Fees
- Banks
- TokenCharge

For more information on the services listed above, visit the [Ravepay website](http://rave.flutterwave.com/)

## How to use

`npm install ravepay`


 You can get your PUBLICK_KEY and SECRET_KEY from the Rave dashboard. 

 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.
 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.

 
```
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
```

If you pass true as the value for PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use the staging base url;

```
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'https://ravesandboxapi.flutterwave.com'

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'

```

### Card Charge

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Card.charge(
    {
        "cardno": "5438898014560229",
        "cvv": "890",
        "expirymonth": "09",
        "expiryyear": "19",
        "currency": "NGN",
        "country": "NG",
        "amount": "10",
        "pin": "3310",
        "suggested_auth": "pin",
        "email": "user@gmail.com",
        "phonenumber": "0902620185",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-" + Date.now(),// your unique merchant reference
        "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
      }
).then(resp => {
    // console.log(resp.body);

    rave.Card.validate({
        "transaction_reference":resp.body.data.flwRef,
        "otp":12345
    }).then(response => {
        console.log(response.body.data.tx);
        
    })
    
}).catch(err => {
    console.log(err);
    
})
```


### Tokenized Charge

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);


rave.TokenCharge.card({
    "token": "flw-t0-341d0303583cfbfdf4be74bb52d63ce1-m03k",
    "currency": "NGN",
    "country": "NG",
    "amount": "10",
    "pin": "3310",
    "suggested_auth": "pin",
    "email": "user@gmail.com",
    "phonenumber": "0902620185",
    "firstname": "temi",
    "lastname": "desola",
    "IP": "355426087298442",
    "txRef": "MC-" + Date.now(),// your unique merchant reference
    "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
    "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
    "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"

}).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```


### Tranfers

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Transfer.initiate(
    {
        "account_bank": "044",
        "account_number": "0690000044",
        "amount": 500,
        "seckey": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
        "narration": "New transfer",
        "currency": "NGN",
        "reference": "mk-902837-jk"
    }
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```


### Subaccounts

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Subaccount.create(
    {
	"account_bank": "044",
	"account_number": "0690000035",
	"business_name": "JK Services",
	"business_email": "jk@services.com",
	"business_contact": "Seun Alade",
	"business_contact_mobile": "090890382",
	"business_mobile": "09087930450",
	"meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}],
	"seckey": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X"
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```


### Subscriptions

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Subscription.activate(
    {
	"id": 912,
	"seckey": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X"
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```


### Payment Plans

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Paymentplan.list(
    {
	"id": 912,
	"seckey": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X"
    }
    
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```