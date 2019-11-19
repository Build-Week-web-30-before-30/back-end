const router = require('express').Router();

const Todos = require('../helpers/todos-model');

router.post('/', async (req, res) => {
  try {
    const { description, links, board_id } = req.body;
    const newTodo = await Todos.insert({ description, links, board_id });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'unable to add todo ' + error.message });
  }
});

module.exports = router;
