exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('boards')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('boards').insert([
        { name: 'My Bucket List', user_id: 1 },
        { name: '2020 Bucket list', user_id: 2 },
        { name: "Jason's Bucket List", user_id: 3 }
      ]);
    });
};
