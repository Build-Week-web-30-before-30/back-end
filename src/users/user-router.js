const router = require('express').Router();

const Users = require('./users-model');

router.get('/', async (req, res) => {
  const users = await Users.find();
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Could not get users ' + error.message });
  }
});

module.exports = router;
