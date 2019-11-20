exports.up = function(knex) {
  return knex.schema.createTable('feedback', tbl => {
    tbl.increments();
    tbl.text('description').notNullable();
    tbl
      .integer('board_id')
      .notNullable()
      .unsigned()
      .references('boards.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('feedback');
};
