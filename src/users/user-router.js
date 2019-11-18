const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');

router.post('/', async (req, res) => {
  const { name, username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  try {
    const user = await Users.insert({ name, username, password: hash });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Could not insert user ' + error.message });
  }
});

router.get('/', async (req, res) => {
  const users = await Users.find();

  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Could not get users ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Could not get user ' + error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, name } = req.body;
  const updatedUser = await Users.update(id, { username, name });

  try {
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Could not update user ' + error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Users.remove(id);

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Could not delete user ' + error.message });
  }
});

module.exports = router;
