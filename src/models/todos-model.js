const db = require('../db-config');

module.exports = {
  insert,
  find,
  findById,
  findByBoard,
  update,
  remove
};

async function insert(todo) {
  const [id] = await db('todos').insert(todo, 'id');

  return db('todos')
    .where({ id })
    .first();
}

async function find() {
  const todos = await db('todos').select('id', 'description', 'completed');
  return todos;
}

async function findById(id) {
  const todo = await db('todos')
    .where({ id })
    .first();

  return todo;
}

async function findByBoard(board_id) {
  const todo = await db('todos').where({ board_id });
  return todo;
}

async function update(todo, id) {
  const updatedTodo = await db('todos')
    .where({ id })
    .update(todo);

  if (updatedTodo) {
    const todo = await findById(id);
    return todo;
  }
}

async function remove(id) {
  const todo = findById(id);

  if (todo) {
    const deleted = await db('todos')
      .where({ id })
      .del();
    if (deleted) {
      return todo;
    }
  }
}
