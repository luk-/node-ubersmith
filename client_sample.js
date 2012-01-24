var UbersmithAPI = require('ubersmith');


var client = new UbersmithAPI('user', 'pass', 'http://url-to-your-instance/api/2.0/');


var api_calls = {};


//
// with arguments and a callback function
//
api_calls['client.list'] = 
  { args: { inactive: 0, brand_id: 2, direction: 'desc' },
    callback: function(err, res) {
      err ? console.log(err) : console.log(res.body);
    }
  }


//
// with no arguments or callback - using default callback of console.log return json
//
api_calls['order.list'] = {};


client.Async(api_calls);
