var createRouter = require('polkadot-router')

function get() {
  var data = [];

  var router = createRouter({
    GET: {
      '/resource': (req, res) => {
        
      },
      '/resource/:idx': (req, res) => {},
      '/query': (req, res) => {},
    },
    PUT: {
      '/resource': (req, res) => {

      }
    },
    POST: {
      '/resource': (req, res) => {

      }
    },
    DELETE: {
      '/resource': (req, res) => {

      },
      '/resource/:idx': (req, res) => {},
    }
  });
  
  // app.use(express.text({ type: '*/*' }));
  // app.get('/', (req, res) => {
  //   res.send('<h1>It works!</h1>');
  // });


  // app.get('/resource', (req, res) => {
  //   res.send(data);
  // });

  // app.post('/resource', (req, res) => {
  //   data.push(req.body);
  //   res.status(201).send('<h1>It posts!</h1>');
  // });

  // app.put('/resource', (req, res) => {
  //   data = [req.body];
  //   res.send('<h1>It puts!</h1>');
  // });

  // app.delete('/resource', (req, res) => {
  //   data = [];
  //   res.send('<h1>It deletes!</h1>');
  // });

  // app.delete('/resource/:idx', (req, res) => {
  //   data.splice(parseInt(req.params.idx, 10), 1);
  //   res.send('<h1>It deletes idx!</h1>');
  // });

  // app.get('/resource/:idx', (req, res) => {
  //   res.send('<h1>It indexes: '+data[parseInt(req.params.idx, 10)]+'!</h1>');
  // });

  // app.get('/query', (req, res) => {
  //   res.send('<h1>It query\'s: '+data[parseInt(req.query.idx, 10)]+'!</h1>');
  // });

  return /*app*/;
}

module.exports = get;