const request = require('supertest');
const db = require('../../db-config');
const server = require('../../../api/app');

// const Boards = require('../../models/board-model');
// const Users = require('../../models/users-model');

beforeEach(async () => {
  await db('boards').truncate();
  await db('users').truncate();
  jest.setTimeout(10000);
});

const user = {
  name: 'Liam',
  username: 'liam90',
  password: '1234'
};

const boardURL = '/api/boards';

const board = {
  name: 'My bucket list',
  user_id: 1,
  isPublic: true,
  deadline: '24-05-2020'
};

describe('Board router', () => {
  describe('POST /api/boards endpoint', () => {
    it('should return the newly created board', async () => {
      const registerResponse = await request(server)
        .post('/api/auth/register')
        .send(user);
      const token = registerResponse.body.token;

      const boardResponse = await request(server)
        .post(boardURL)
        .send(board)
        .set('authorization', token);

      expect(boardResponse.status).toBe(201);
      expect(boardResponse.body).toEqual({
        id: 1,
        name: 'My bucket list',
        deadline: '24-05-2020',
        isPublic: true,
        user_id: 1
      });
    });

    it('should return correct error if no body/board sent', async () => {
      const registerResponse = await request(server)
        .post('/api/auth/register')
        .send(user);
      const token = registerResponse.body.token;

      const boardResponse = await request(server)
        .post(boardURL)
        .set('authorization', token);

      expect(boardResponse.status).toBe(400);
      expect(boardResponse.body).toEqual({
        message: 'Please make sure board information is correctly filled out.'
      });
    });

    it('should return correct error if required fields are missing', async () => {
      const registerResponse = await request(server)
        .post('/api/auth/register')
        .send(user);
      const token = registerResponse.body.token;

      const boardResponse = await request(server)
        .post(boardURL)
        .send({ isPublic: true, deadline: '12-2-2020' })
        .set('authorization', token);

      expect(boardResponse.status).toBe(400);
      expect(boardResponse.body).toEqual({
        message: 'Please provide a name and user id'
      });
    });

    it('should return correct error if no token is provided', async () => {
      await request(server)
        .post('/api/auth/register')
        .send(user);

      const boardResponse = await request(server)
        .post(boardURL)
        .send({ isPublic: true, deadline: '12-2-2020' });

      expect(boardResponse.status).toBe(401);
      expect(boardResponse.body).toEqual({ message: 'You shall not pass' });
    });
  });
});
