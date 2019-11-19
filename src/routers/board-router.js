const router = require('express').Router();
const checkIsPrivate = require('../middleware/checkIsPrivate');

const Boards = require('../helpers/board-model');

router.post('/', async (req, res) => {
  try {
    const { name, user_id } = req.body;
    const newBoard = await Boards.insert({ name, user_id });

    res.status(201).json(checkIsPrivate(newBoard));
  } catch (error) {
    res.status(500).json({ message: 'Unable to add board ' + error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const boards = await Boards.find();

    res.status(200).json(checkIsPrivate(boards));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to fetch boards ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Boards.findById(id);

    res.status(200).json(checkIsPrivate(board));
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch board ' + error.message });
  }
});

// WIP
router.get('/', async (req, res) => {
  try {
    const { public } = req.query;
    const privateBoard = await Boards.findPublic(public);

    res.status(200).json(checkIsPrivate(privateBoard));
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch board ' + error.message });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
