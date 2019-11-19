const db = require('../db-config');

module.exports = {
  insert,
  find,
  findById,
  update,
  remove
};

async function insert(link) {
  const [id] = await db('links').insert(link, 'id');

  return db('links')
    .where({ id })
    .first();
}

async function find() {
  const links = await db('links');
  return links;
}

async function findById(id) {
  const link = await db('links')
    .where({ id })
    .first();

  return link;
}

async function update(link, id) {
  const updatedLink = await db('links')
    .where({ id })
    .update(link);

  if (updatedLink) {
    const link = findById(id);
    return link;
  }
}

async function remove(id) {
  const link = findById(id);

  if (link) {
    const deleted = await db('links')
      .where({ id })
      .del();
    if (deleted) {
      return link;
    }
  }
}
