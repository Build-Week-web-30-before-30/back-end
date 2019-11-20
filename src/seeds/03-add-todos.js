exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('todos').insert([
        { todo: 'Go sky-diving', board_id: 1 },
        { todo: 'Visit Empire state bulding', board_id: 2 },
        { todo: 'Live abroad', board_id: 3 }
      ]);
    });
};
