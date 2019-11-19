const router = require('express').Router();

const checkIsPrivate = require('../utils/checkIsPrivate');
const checkIsComplete = require('../utils/checkIsCompleted');
const auth = require('../utils/verify-token');

const Boards = require('../helpers/board-model');
const Feedback = require('../helpers/feedback-model');
const Todos = require('../helpers/todos-model');

router.post('/', auth, async (req, res) => {
  try {
    const { name, user_id } = req.body;
    const newBoard = await Boards.insert({ name, user_id });

    res.status(201).json(checkIsPrivate(newBoard));
  } catch (error) {
    res.status(500).json({ message: 'Unable to add board ' + error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const boards = await Boards.findPublic();

    res.status(200).json(checkIsPrivate(boards));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to fetch boards ' + error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Boards.findById(id);

    res.status(200).json(checkIsPrivate(board));
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch board ' + error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, deadline, private } = req.body;

    const boardToUpdate = await Boards.update(
      {
        name,
        deadline,
        private
      },
      id
    );
    res.status(200).json(checkIsPrivate(boardToUpdate));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to update board ' + error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBoard = await Boards.remove(id);
    res.status(200).json({
      message: 'Board Deleted',
      deletedBoard
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to update board ' + error.message });
  }
});

router.post('/:id/feedback', auth, async (req, res) => {
  try {
    const newFeedback = {
      description: req.body.description,
      board_id: req.params.id
    };
    const feedback = await Feedback.insert(newFeedback);

    res.status(201).json({
      message: 'Feedback added successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to add feedback' + error.message });
  }
});

router.get('/:id/feedback', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.find(id);

    res.status(200).json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to get feedback ' + error.message });
  }
});

router.post('/:id/todos', auth, async (req, res) => {
  try {
    const { description, completed, board_id } = req.body;
    const newTodo = await Todos.insert({ description, completed, board_id });

    res.status(201).json({
      message: 'Todo added successfully',
      newTodo: checkIsComplete(newTodo)
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to add todo ' + error.message });
  }
});

router.get('/:id/todos', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todos.findByBoard(id);

    res.status(200).json(checkIsComplete(todos));
  } catch (error) {
    res.status(500).json({ message: 'Unable to get todos ' + error.message });
  }
});

module.exports = router;
