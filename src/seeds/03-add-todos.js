exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('todos').insert([
        { description: 'Go sky-diving', board_id: 1 },
        { description: 'Visit Empire state bulding', board_id: 2 },
        { description: 'Live abroad', board_id: 3 }
      ]);
    });
};
