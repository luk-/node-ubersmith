var request = require('request')
  , qstring = require('querystring');


var UberAPI = module.exports = function (u, p, url) {

  this.auth = new Buffer(u + ':' + p).toString('base64');
  this.url = url;

}


UberAPI.prototype._call = function (session, method, callback) {

//
// No callback specified? nbd, the default callback returns the response json...
// If you don't actually want a callback, define callback: {} in the async object 
//
  if (!callback) {

    arguments[2] = function(err, res) {
      err ? console.log(err) : console.log(res.body);
    };

  }


  return request({

//
// if your instance is _unique_, you can add additional headers here to be sent
// on every api request
//
    headers:  {
        'Authorization' : 'Basic ' + session.auth
      , 'Content-type'  : 'application/x-www-form-urlencoded' 
    }

    ,  method:  'POST'
    ,  uri:     session.url
    ,  body:    'method=' + method
  }
  , callback
  );

}


UberAPI.prototype.Async = function (methods) {

  var session = this;

  //
  // Let's go ahead and loop through the API methods & arguments
  // We can do this synchronously since none of this is blocking
  //
  Object.keys(methods).forEach(function (obj) {

    var args = '&' + qstring.stringify(methods[obj].args);


    //
    // If there's no callback defined for a method, that's fine.
    // ._call() will take care of it, so we don't delay the loop.
    //
    UberAPI.prototype._call(session, obj + args, methods[obj].callback);

  });

}
