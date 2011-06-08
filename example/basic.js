var pint = require('../pintpay');

var pintpay = new pint.PintPay('YOUR_KEY', 'YOUR_SECRET');

pintpay.getAllSubscriptions(function(result) {
    console.log(result);
});