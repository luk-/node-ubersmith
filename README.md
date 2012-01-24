# Ubersmith
### [Ubersmith.com](http://www.ubersmith.com)
## A painless way to interact with the Ubermsith API asynchronously in your node app

With this API wrapper, you can send requests to your Ubersmith instance in your node app with *fairly minimal* effort.

### Installation

    npm install ubersmith


###Usage

**First, create a variable with your instance details:**

    var client = new UberAPI('user', 'password', 'url');


You can create as many of these as you need if you're working with multiple instances.

**Each level of your API call(s) needs to be represented with an object with child objects to represent the API methods. In these child objects, you can include optional arguments and callbacks:**

```javascript
var uber_calls = {};

uber_calls['client.count'] = {};
uber_calls['device.list'] = {
  args: {
    inactive: 0,
    limit: 10
  },
  callback: function (err, res) {
    err ? console.log (err) : console.log(res.body);
  }
}
```


**Once your API calls are defined, call the Async() function on the original client object created:** 

    client.Async(uber_calls);

Since these API calls are asynchronously, there's no way to predict which callback will fire first. In most cases, you'll probably find that calls which normally return less data and take less arguments will process faster, but you should *never* rely on that and always write your callbacks accordingly.

**Methods with no function defined will call console.log on the JSON output. If you would rather this be silenced, define a callback object, but leave it empty:**

```javascript
uber_calls['device_list'] = {
  callback: {}
}
```

