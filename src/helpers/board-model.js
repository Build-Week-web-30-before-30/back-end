const db = require('../db-config');

module.exports = {
  insert,
  find,
  findById,
  findPublic,
  remove,
  update
};

async function insert(board) {
  const [id] = await db('boards').insert(board, 'id');

  return db('boards')
    .where({ id })
    .first();
}

async function find() {
  const board = await db('boards');
  return board;
}

async function findById(id) {
  const board = await db('boards')
    .where({ id })
    .first();

  return board;
}

// WIP
async function findPublic(public) {
  const board = await db('boards').where({ public });
  return board;
}

async function remove(id) {
  const board = findById(id);

  if (board) {
    const deleted = await db('boards')
      .where({ id })
      .del();
    if (deleted) {
      return board;
    }
  }
}

async function update(board, id) {
  const editiedBoard = await db('boards')
    .where({ id })
    .update(board);

  if (editiedBoard) {
    const board = await findById(id);
    return board;
  }
}
