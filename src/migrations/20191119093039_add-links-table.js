exports.up = function(knex) {
  return knex.schema.createTable('links', tbl => {
    tbl.increments();
    tbl.string('link', 300);
    tbl
      .integer('todo_id')
      .notNullable()
      .unsigned()
      .references('todos.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('links');
};
