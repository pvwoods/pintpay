var rest = require('restler');

var PintPay = exports.PintPay = function(key, secret) {
    this.api_key    = key;
    this.api_secret = secret;
    this.PINTPAY_BASE_URL = "https://www.pintpay.com/api/1/";
}

PintPay.prototype.dispatchRequest = function(request, callback, shouldPut){
    requestURL = this.PINTPAY_BASE_URL + request + "?api_key=" + this.api_key + "&api_secret=" + this.api_secret;
    console.log(requestURL);
    if(shouldPut == null){
        rest.get(requestURL).on('complete', function(data) {
            callback(data);
        });
    }else if(shouldPut == true){
        rest.put(requestURL).on('complete', function(data) {
            callback(data);
        });
    }
    
}

PintPay.prototype.getAllSubscriptions = function(callback){
    return this.dispatchRequest("subscriptions", callback);
}

PintPay.prototype.getSubscription = function(secret, callback){
    return this.dispatchRequest("subscriptions/" + secret, callback);
}

PintPay.prototype.cancelSubscription = function(secret, callback){
    if(secret != null && (typeof secret == "string") && secret != "")
        return this.dispatchRequest("subscriptions/" + secret + "/cancel", callback, true);
    else
        console.log("you can not cancel a subscription without providing a secret");
        return null;
}