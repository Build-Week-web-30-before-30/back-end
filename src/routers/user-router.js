const router = require('express').Router();

const Users = require('../models/users-model');
const auth = require('../middleware/auth');
const {
  checkUserBodyExists,
  checkUserBodyValues,
  validateUserId
} = require('../middleware/validate-user');

router.get('/', async (req, res) => {
  const users = await Users.find();

  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Could not get user ' + error.message });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Could not get user ' + error.message });
  }
});

router.put(
  '/:id',
  [auth, validateUserId, checkUserBodyExists, checkUserBodyValues],
  async (req, res) => {
    const { id } = req.params;
    const { username, name } = req.body;
    const updatedUser = await Users.update(id, { username, name });

    try {
      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Could not update user ' + error.message });
    }
  }
);

router.delete('/:id', validateUserId, async (req, res) => {
  const { id } = req.params;
  const user = await Users.remove(id);

  try {
    res.status(200).json({
      message: `User deleted successfully`,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete user ' + error.message });
  }
});

module.exports = router;
