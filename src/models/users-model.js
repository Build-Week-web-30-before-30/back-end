const db = require('../db/db-config');

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

  return findById(id);
}

async function find() {
  const users = await db('users').select('id', 'name', 'username');
  return users;
}

async function findBy(username) {
  const user = await db('users')
    .where({ username })
    .first();
  return user;
}

async function findById(id) {
  const user = await db('users')
    .where({ id })
    .first();

  return user;
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
