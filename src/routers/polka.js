var polka = require('polka');

function get() {
  var app = polka();
  // app.use(express.text({ type: '*/*' }));
  app.get('/', (req, res) => {
    res.end('<h1>It works!</h1>');
  });

  var data = [];

  app.get('/resource', (req, res) => {
    res.end(JSON.stringify(data));
  });

  app.post('/resource', async (req, res) => {
    var theBody = await new Promise((r_, j_) => {
      var buf = ''
      req.on('data', x => buf += x)
      req.on('end', () => r_(buf))
    });
    data.push(theBody);
    res.statusCode = 201;
    res.end('<h1>It posts!</h1>');
  });

  app.put('/resource', async (req, res) => {
    var theBody = await new Promise((r_, j_) => {
      var buf = ''
      req.on('data', x => buf += x)
      req.on('end', () => r_(buf))
    });
    data = [theBody];
    res.end('<h1>It puts!</h1>');
  });

  app.delete('/resource', (req, res) => {
    data = [];
    res.end('<h1>It deletes!</h1>');
  });

  app.delete('/resource/:idx', (req, res) => {
    data.splice(parseInt(req.params.idx, 10), 1);
    res.end('<h1>It deletes idx!</h1>');
  });

  app.get('/resource/:idx', (req, res) => {
    res.end('<h1>It indexes: '+data[parseInt(req.params.idx, 10)]+'!</h1>');
  });

  app.get('/query', (req, res) => {
    res.end('<h1>It query\'s: '+data[parseInt(req.query.idx, 10)]+'!</h1>');
  });

  return app.handler;
}

module.exports = get;