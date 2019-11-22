exports.up = function(knex) {
  return knex.schema.createTable('boards', tbl => {
    tbl.increments();
    tbl.string('name', 128).notNullable();
    tbl.string('deadline');
    tbl.boolean('isPublic').defaultTo(false);
    tbl
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('boards');
};
