var { expect } = require('chai');

var rb = require('../src');

describe.only('router-same-behavior', () => {
  it('should make sure the routers are the same', async () => {
    for (var router in rb.routers) {
      var createApp = rb.routers[router];
      var app = createApp();
      var { port, server } = await rb.run.startServer(app);

      var home = await rb.requests.request({ port });
      expect(home.body).to.equal('<h1>It works!</h1>');
      expect(home.headers).to.be.an('object');
      expect(home.statusCode).to.equal(200);

      var getAll = await rb.requests.request({ port, path: '/resource' });
      expect(getAll.body).to.equal('[]');
      expect(getAll.headers).to.be.an('object');
      expect(getAll.statusCode).to.equal(200);

      var postOne = await rb.requests.request({
        port,
        path: '/resource',
        method: 'POST',
      }, 'firstOne');
      expect(postOne.statusCode).to.equal(201);
      expect(postOne.body).to.equal('<h1>It posts!</h1>');

      var seeOne = await rb.requests.request({ port, path: '/resource' });
      expect(seeOne.body).to.equal('["firstOne"]');
      expect(seeOne.headers).to.be.an('object');
      expect(seeOne.statusCode).to.equal(200);

      for (var i = 0; i < 3; i++) {
        await rb.requests.request({
          port, path: '/resource', method: 'post',
        }, 'another-' + i);
      }

      var seeAll = await rb.requests.request({ port, path: '/resource' });
      expect(seeAll.body).to.equal('["firstOne","another-0","another-1","another-2"]');
      expect(seeAll.headers).to.be.an('object');
      expect(seeAll.statusCode).to.equal(200);

      var deleteOne = await rb.requests.request({
        port, path: '/resource/1', method: 'delete'
      });
      expect(deleteOne.body).to.equal('<h1>It deletes idx!</h1>');
      expect(deleteOne.statusCode).to.equal(200);

      var seeButOne = await rb.requests.request({ port, path: '/resource' });
      expect(seeButOne.body).to.equal('["firstOne","another-1","another-2"]');
      expect(seeButOne.headers).to.be.an('object');
      expect(seeButOne.statusCode).to.equal(200);

      var deleteAnother = await rb.requests.request({
        port, path: '/resource/1', method: 'delete'
      });
      expect(deleteAnother.body).to.equal('<h1>It deletes idx!</h1>');
      expect(deleteAnother.statusCode).to.equal(200);

      var seeButTwo = await rb.requests.request({ port, path: '/resource' });
      expect(seeButTwo.body).to.equal('["firstOne","another-2"]');
      expect(seeButTwo.headers).to.be.an('object');
      expect(seeButTwo.statusCode).to.equal(200);

      var queryFirst = await rb.requests.request({
        port, path: '/query?idx=0'
      });
      expect(queryFirst.body).to.match(/firstOne/);
      expect(queryFirst.headers).to.be.an('object');
      expect(queryFirst.statusCode).to.equal(200);

      var querySecond = await rb.requests.request({
        port, path: '/query?idx=1'
      });
      expect(querySecond.body).to.match(/another-2/);
      expect(querySecond.headers).to.be.an('object');
      expect(querySecond.statusCode).to.equal(200);

      var paramFirst = await rb.requests.request({
        port, path: '/resource/0'
      });
      expect(paramFirst.body).to.match(/firstOne/);
      expect(paramFirst.headers).to.be.an('object');
      expect(paramFirst.statusCode).to.equal(200);

      var paramSecond = await rb.requests.request({
        port, path: '/resource/1'
      });
      expect(paramSecond.body).to.match(/another-2/);
      expect(paramSecond.headers).to.be.an('object');
      expect(paramSecond.statusCode).to.equal(200);


      var deleteAll = await rb.requests.request({
        port, path: '/resource', method: 'delete'
      });
      expect(deleteAll.body).to.equal('<h1>It deletes!</h1>');
      expect(deleteAll.statusCode).to.equal(200);

      var seeNone = await rb.requests.request({ port, path: '/resource' });
      expect(seeNone.body).to.equal('[]');
      expect(seeNone.headers).to.be.an('object');
      expect(seeNone.statusCode).to.equal(200);

      await new Promise(r => server.close(r));
    }
  });
})