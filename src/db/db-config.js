const knex = require('knex');
const config = require('../../knexfile');

let client;

switch (process.env.NODE_ENV) {
  case 'production':
    client = knex(config.production);
    break;
  case 'testing':
    client = knex(config.testing);
    break;
  default:
    client = knex(config.development);
}

module.exports = client;
