var createRouter = require('polkadot-router')
var polkadot = require('polkadot')

function get() {
  var data = [];

  var router = createRouter({
    GET: {
      '/': (req, res) => {
        return '<h1>It works!</h1>';
      },
      '/resource': (req, res) => {
        return data;
      },
      '/resource/:idx': (req, res) => {
        return '<h1>It indexes: '+data[parseInt(req.params.idx, 10)]+'!</h1>';
      },
      '/query': (req, res) => {
        return '<h1>It query\'s: '+data[parseInt(req.query.idx, 10)]+'!</h1>';
      },
    },
    POST: {
      '/resource': async (req, res) => {
        var theBody = await new Promise((r_, j_) => {
          var buf = ''
          req.on('data', x => buf += x)
          req.on('end', () => r_(buf))
          /*
          // this one doesnt make sense for short payloads
          var chunks = [];
          req.on('data', chunk => {
            console.log(chunk.prototype)
            console.log(chunks)
            chunks.push(chunk)
          });
          req.on('end', () => r_(chunks.join('')));
          */
          req.on('error', j_);
        });
        data.push(theBody);
        res.statusCode = 201;
        return '<h1>It posts!</h1>';
      }
    },
    PUT: {
      '/resource': (req, res) => {
        data = [req.body];
        return '<h1>It puts!</h1>';
      }
    },
    DELETE: {
      '/resource': (req, res) => {
        data = [];
        return '<h1>It deletes!</h1>';
      },
      '/resource/:idx': (req, res) => {
        data.splice(parseInt(req.params.idx, 10), 1);
        return '<h1>It deletes idx!</h1>';
      },
    }
  });

  return polkadot(router).handler;
}

module.exports = get;