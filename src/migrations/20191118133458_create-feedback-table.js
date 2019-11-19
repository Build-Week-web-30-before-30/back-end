exports.up = function(knex) {
  return knex.schema.createTable('feedback', tbl => {
    tbl.increments();
    tbl.text('description');
    tbl
      .integer('board_id')
      .notNullable()
      .unsigned()
      .references('boards.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('feedback');
};
