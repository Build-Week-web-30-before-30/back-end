const db = require('../db/db-config');

module.exports = {
  insert,
  findById,
  find
};

async function insert(feedback) {
  const [id] = await db('feedback').insert(feedback, 'id');

  return findById(id);
}

async function findById(id) {
  const feedback = await db('feedback')
    .where({ id })
    .first();

  return feedback;
}

async function find(board_id) {
  const feedback = await db('feedback').where({ board_id });

  return feedback;
}
