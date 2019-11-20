const db = require('../db-config');

module.exports = {
  insert,
  findAllByBoard,
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

async function findAllByBoard(id) {
  const boards = await db('boards').where({ user_id: id });
  return boards;
}

async function findById(id) {
  const board = await db('boards')
    .where({ id })
    .first();

  return board;
}

async function findPublic() {
  const board = await db('boards').where({ isPublic: true });
  if (board) {
    return board;
  }
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
  const updatedBoard = await db('boards')
    .where({ id })
    .update(board);

  if (updatedBoard) {
    const board = await findById(id);
    return board;
  }
}
