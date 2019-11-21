const request = require('supertest');
const server = require('../../../api/app');
const db = require('../../db-config');

beforeEach(async () => {
  await db('users').truncate();
});

const registerURL = '/api/auth/register';
const loginURL = '/api/auth/login';
const user = { name: 'jordan', username: 'jord90', password: '1234' };

describe('Auth router', () => {
  describe('POST /register endpoint', () => {
    it('should return a 201 Created status', async () => {
      const response = await request(server)
        .post(registerURL)
        .send(user);

      expect(response.status).toBe(201);
    });

    it('should return a token on successful registration', async () => {
      const response = await request(server)
        .post(registerURL)
        .send(user);

      expect(response.body).toHaveProperty('token');
    });

    it('should have a content-type of json', async () => {
      await request(server)
        .post(registerURL)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
    });

    it('should return correct error if no body is entered', async () => {
      const response = await request(server).post(registerURL);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Please provide user details' });
    });

    it('should return correct error if some fields are missing', async () => {
      const response = await request(server)
        .post(registerURL)
        .send({ name: '', username: 'Liam', password: '1234' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Please make sure all fields are filled.'
      });
    });
  });

  describe('POST /login endpoint', () => {
    it('should return a 200 OK', async () => {
      let response = await request(server)
        .post(registerURL)
        .send(user);
      expect(response.status).toBe(201);

      response = await request(server)
        .post(loginURL)
        .send(user);
      expect(response.status).toBe(200);
    });

    it('should return a token on login', async () => {
      let response = await request(server)
        .post(registerURL)
        .send(user);
      expect(response.status).toBe(201);

      response = await request(server)
        .post(loginURL)
        .send(user);
      expect(response.body).toHaveProperty('token');
    });

    it('should return correct error if invalid credentials', async () => {
      let response = await request(server)
        .post(registerURL)
        .send(user);
      expect(response.status).toBe(201);

      response = await request(server)
        .post(loginURL)
        .send({ username: 'jord55', password: '1234' }); // invalid user
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Invalid credentials' });
    });
  });
});
