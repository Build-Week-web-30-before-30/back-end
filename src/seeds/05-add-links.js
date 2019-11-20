exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('links')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('links').insert([
        { link: 'www.google.com', todo_id: 1 },
        { link: 'www.yahoo.com', todo_id: 2 },
        { link: 'www.firefox.com', todo_id: 3 },
        { link: 'www.google.com', todo_id: 2 }
      ]);
    });
};
