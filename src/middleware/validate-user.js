const Users = require('../models/users-model');

const validateLogin = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ message: 'Please make sure all fields are filled.' });
  } else {
    next();
  }
};

const checkUserBodyExists = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Please provide user details' });
  } else {
    next();
  }
};

const checkUserBodyValues = (req, res, next) => {
  if (!req.body.name || !req.body.username) {
    res
      .status(400)
      .json({ message: 'Please make sure all fields are filled.' });
  } else {
    next();
  }
};

const validateUserId = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User does not exist' });
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
  checkUserBodyExists,
  checkUserBodyValues,
  validateUserId,
  validateLogin
};
