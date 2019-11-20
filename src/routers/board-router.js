const router = require('express').Router();

const checkIsPublic = require('../utils/check-is-public');
const checkIsComplete = require('../utils/check-is-completed');
const auth = require('../utils/verify-token');

const { validateBody, validateId } = require('../middleware/validate-board');

const Boards = require('../models/board-model');
const Feedback = require('../models/feedback-model');
const Todos = require('../models/todos-model');

// Add board for specific user
router.post('/', [auth, validateBody], async (req, res) => {
  try {
    const { name, user_id, public } = req.body;
    const newBoard = await Boards.insert({ name, user_id, public });

    res.status(201).json(checkIsPublic(newBoard));
  } catch (error) {
    res.status(500).json({ message: 'Unable to add board ' + error.message });
  }
});

// Get all public boards
router.get('/public', auth, async (req, res) => {
  try {
    const boards = await Boards.findPublic();

    if (boards.length) {
      res.status(200).json(checkIsPublic(boards));
    } else {
      res.json({ message: 'Found 0 public boards' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to fetch boards ' + error.message });
  }
});

// Get all boards for a user
router.get('/user/:id', [auth, validateId], async (req, res) => {
  try {
    const { id } = req.params;
    const boards = await Boards.findAllByBoard(id);

    if (boards.length) {
      res.status(200).json(checkIsPublic(boards));
    } else {
      res.json({ message: 'Board does not exist' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to fetch boards ' + error.message });
  }
});

// Get board by id
router.get('/:id', [auth, validateId], async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Boards.findById(id);

    res.status(200).json(checkIsPublic(board));
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch board ' + error.message });
  }
});

// Update Board Information
router.put('/:id', [auth, validateId], async (req, res) => {
  try {
    const { id } = req.params;
    const { name, deadline, public, user_id = id } = req.body;

    const boardToUpdate = await Boards.update(
      {
        name,
        deadline,
        public,
        user_id
      },
      id
    );
    res.status(200).json(checkIsPublic(boardToUpdate));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to update board ' + error.message });
  }
});

// Delete Board
router.delete('/:id', [auth, validateId], async (req, res) => {
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

// Add Feedback for board
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

// Fetch baord feedback
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

// Add todos to board
router.post('/:id/todos', auth, async (req, res) => {
  try {
    const { todo, completed, board_id } = req.body;
    const newTodo = await Todos.insert({ todo, completed, board_id });

    res.status(201).json({
      message: 'Todo added successfully',
      newTodo: checkIsComplete(newTodo)
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to add todo ' + error.message });
  }
});

// Fetch todos for board
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
