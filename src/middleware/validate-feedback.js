const Feedback = require('../helpers/feedback-model');

const validateBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'Please make sure feedback information is correctly filled out.'
    });
  } else if (!req.body.description || !req.body.board_id) {
    res
      .status(400)
      .json({ message: 'Please provide a description and board id' });
  } else {
    next();
  }
};

const validateId = async (req, res, next) => {
  try {
    const feedback = await Feedback.find(req.params.id);

    if (!feedback) {
      res.status(404).json({ message: 'Feedback does not exist' });
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
