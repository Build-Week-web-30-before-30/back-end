const router = require('express').Router();
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generate-token');
const {
  validateRegistration,
  validateLogin
} = require('../middleware/validate-user');

const Users = require('../helpers/users-model');

router.post('/register', validateRegistration, async (req, res) => {
  const { name, username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  const userDetails = {
    name,
    username,
    password: hash
  };

  try {
    const newUser = await Users.insert(userDetails);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to register account ' + error.message });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(404).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to login ' + error.message });
  }
});

module.exports = router;
