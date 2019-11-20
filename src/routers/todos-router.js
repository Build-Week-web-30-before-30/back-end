const router = require('express').Router();
const checkIsCompleted = require('../utils/check-is-completed');

const Todos = require('../models/todos-model');

router.get('/', async (req, res) => {
  try {
    const todos = await Todos.find();

    res.status(201).json(checkIsCompleted(todos));
  } catch (error) {
    res.status(500).json({ message: 'unable to fetch todos ' + error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const todo = await Todos.update({ description, completed }, id);

    res.status(201).json(checkIsCompleted(todo));
  } catch (error) {
    res.status(500).json({ message: 'unable to fetch todos ' + error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todoToRemove = await Todos.remove(id);

    res.status(201).json({
      message: 'Todo Deleted Succesfully',
      deletedTodo: checkIsCompleted(todoToRemove)
    });
  } catch (error) {
    res.status(500).json({ message: 'unable to fetch todos ' + error.message });
  }
});

module.exports = router;
