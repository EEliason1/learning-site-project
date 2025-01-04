const request = require('supertest');
const app = require('..');

test('GraphQL Hello Query', async () => {
  const query = '{ hello }';
  const response = await request(app).post('/graphql').send({ query });
  expect(response.body.data.hello).toBe('Hello, World!');
});
