var https = require('https');

var _setImmediate = setImmediate;
process.once('loaded', function() {
  window.setImmediate = _setImmediate;
});

function makeRequest(cb) {
  if (!cb) {
    cb = function() {}
  }

  console.log('making request');
  var options = {
    host: 'github.com',
    port: 443,
    path: '/',
    method: 'GET',
    agent: new https.Agent()
  };
  var req = https.request(options, (res) => {
    console.log('request/statusCode:', res.statusCode);
    console.log('request/headers:', res.headers);

    res.on('data', (d) => {
      console.log('data', d.toString().length);
    });
    res.on('end', () => {
      console.log('No more data in response.');
      return cb();
    });
  });

  req.on('request/error', (e) => {
    console.error(e);
    return cb();
  });
  req.end();
}


makeRequest(function() {
  makeRequest();
});

if (typeof window !== 'undefined') {
  window.makeRequest = makeRequest;
}
