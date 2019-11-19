exports.up = function(knex) {
  return knex.schema.createTable('todos', tbl => {
    tbl.increments();
    tbl.string('description', 400).notNullable();
    tbl.boolean('completed').defaultTo(false);
    tbl
      .integer('board_id')
      .notNullable()
      .unsigned()
      .references('boards.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todos');
};
