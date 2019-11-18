const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'David',
          username: 'David12',
          password: bcrypt.hashSync('1234', 8)
        },
        {
          name: 'Michael',
          username: 'Michael1244',
          password: bcrypt.hashSync('1234', 8)
        },
        {
          name: 'Jason',
          username: 'jase77',
          password: bcrypt.hashSync('1234', 8)
        }
      ]);
    });
};
