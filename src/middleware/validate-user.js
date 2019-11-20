const validateRegistration = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Please provide registration details' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Please provide your name' });
  } else if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Username and password are required' });
  } else {
    next();
  }
};

const validateLogin = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Please provide login details' });
  } else if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Username and password are required' });
  } else {
    next();
  }
};

module.exports = { validateRegistration, validateLogin };
