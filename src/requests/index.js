var http = require('http');
var fs = require('fs');

var defaultOptions = {
  'method': 'GET',
  'hostname': 'localhost',
  'port': 3000,
  'path': '/'
  // 'path': '/thing?abca=1'
};

async function request(passedOptions = {}, requestBody) {
  var options = Object.assign({}, defaultOptions, passedOptions);

  if (requestBody) {
    if (!options['headers']) {
      options['headers'] = {};
    }

    options['headers']['content-type'] = 'text/plain';
  }

  return new Promise((r, j) => {
    var req = http.request(options, function (res) {
      var chunks = [];

      res.on('data', (chunk) => chunks.push(chunk));

      res.on('end', (chunk) => {
        var body = Buffer.concat(chunks);
        r({
          body: body.toString(),
          headers: res.headers,
          statusCode: res.statusCode,
        });
      });

      res.on('error', j);
    });

    if (requestBody)
      req.write(requestBody);

    req.end();
  });
}

module.exports = {
  request
};
