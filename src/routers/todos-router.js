const router = require('express').Router();
const checkIsCompleted = require('../middleware/checkIsCompleted');

const Todos = require('../helpers/todos-model');

router.post('/', async (req, res) => {
  try {
    const { description, board_id } = req.body;
    const newTodo = await Todos.insert({ description, board_id });

    res.status(201).json(checkIsCompleted(newTodo));
  } catch (error) {
    res.status(500).json({ message: 'unable to add todo ' + error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const todos = await Todos.find();

    res.status(201).json(checkIsCompleted(todos));
  } catch (error) {
    res.status(500).json({ message: 'unable to fetch todos ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findById(id);

    res.status(201).json(checkIsCompleted(todo));
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
