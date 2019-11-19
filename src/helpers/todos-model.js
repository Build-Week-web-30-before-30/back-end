const db = require('../db-config');
const checkIsCompleted = require('../middleware/checkIsCompleted');

module.exports = {
  insert
  // find,
};

async function insert(todo) {
  const [id] = await db('todos').insert(checkIsCompleted(todo), 'id');

  return db('todos')
    .where({ id })
    .first();
}

// async function find() {
//   const todos = await db('todos')
// }
