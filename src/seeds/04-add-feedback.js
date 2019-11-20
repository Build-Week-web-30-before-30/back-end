exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('feedback')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('feedback').insert([
        {
          description: 'Great Idea',
          board_id: 1
        },
        {
          description: 'Did this last year recommend',
          board_id: 2
        },
        {
          description: 'Scary',
          board_id: 3
        }
      ]);
    });
};
