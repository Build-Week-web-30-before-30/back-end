// const request = require('supertest');
// const server = require('../../../api/app');

// const db = require('../../db-config');

// beforeEach(() => {
//   return db('users').truncate();
// });

// const baseUrl = '/api/auth';

// const user = {
//   name: 'Mike',
//   username: 'MikeTyson',
//   password: '1234'
// };

// describe('auth router', () => {
//   describe('POST /register', () => {
//     it('should return 201 status code', async () => {
//       const response = await request(server)
//         .post(baseUrl + '/register')
//         .send(user);
//       expect(response.status).toBe(201);
//     });
//   });
// });
