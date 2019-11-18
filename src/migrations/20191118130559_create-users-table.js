exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('name', 50).notNullable();
    tbl
      .string('username', 40)
      .unique()
      .notNullable();
    tbl.string('password', 100).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
