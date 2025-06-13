const request = require('supertest');
const app = require('../index');

test('GET / should return Hello World', async () => {
  const res = await request(app).get('/');
  expect(res.text).toBe('Hello World!');
});
