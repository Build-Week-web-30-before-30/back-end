const request = require('supertest');
const server = require('./app');

describe('server', () => {
  describe('GET / endpoint', () => {
    it('should return 200 OK status code', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });

    it('should return correct response body', async () => {
      const response = await request(server).get('/');
      expect(response.body).toEqual({ message: "It's alive!!!" });
    });

    it('should have a testing NODE_ENV environment', async () => {
      expect(process.env.NODE_ENV).toBe('testing');
    });
  });
});
