const db = require('../db-config');

module.exports = {
  find
  // findById,
  // findBy,
  // create,
  // remove,
  // update
};

async function find() {
  const users = await db('users');
  return users;
}
