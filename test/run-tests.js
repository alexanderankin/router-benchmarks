var rb = require('../src');

describe('run tests', () => {
  it('should just run the tests', async () => {
    await rb.run.runBenchmarks();
  });
});
