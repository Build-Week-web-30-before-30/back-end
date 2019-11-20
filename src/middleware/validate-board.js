const Boards = require('../helpers/board-model');

const validateBody = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'Please make sure board information is correctly filled out.'
    });
  } else if (!req.body.name || !req.body.user_id) {
    res.status(400).json({ message: 'Please provide a name and user id' });
  } else {
    next();
  }
};

const validateId = async (req, res, next) => {
  try {
    const board = await Boards.findById(req.params.id);

    if (!board) {
      res.status(404).json({ message: 'Board does not exist' });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({
      message: 'Your request could not be processed ' + error.message
    });
  }
};

module.exports = {
  validateBody,
  validateId
};
