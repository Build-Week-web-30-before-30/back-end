const db = require('../db-config');

module.exports = {
  insert,
  find,
  findBy,
  findById,
  update,
  remove
};

async function insert(user) {
  const [id] = await db('users').insert(user, 'id');

  return db('users')
    .where({ id })
    .first();
}

async function find() {
  const users = await db('users');
  return users;
}

async function findById(id) {
  const user = await db('users')
    .where({ 'users.id': id })
    .first();

  const { ...rest } = user;
  return rest;
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

async function update(id, user) {
  const updatedUser = await db('users')
    .where({ id })
    .update(user);

  if (updatedUser) {
    const user = await findById(id);
    return user;
  }
}

async function remove(id) {
  const user = await findById(id);
  if (user) {
    const deleted = await db('users')
      .where({ id })
      .del();
    if (deleted) {
      return user;
    }
  }
}
