var http = require('http');
var portfinder = require('portfinder');

var routers = require('./routers');

async function runBenchmarks() {
  console.log('hello world');
  console.log(routers);
}

async function startServer(configuredApplication) {
  var server = http.createServer(configuredApplication);
  var port = await portfinder.getPortPromise();
  await new Promise(r => server.listen(port, r));
  return {
    port,
    server
  };
}

module.exports = {
  runBenchmarks,
  startServer
};
