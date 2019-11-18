const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('../src/routers/user-router');
const authRouter = require('../src/routers/auth-router');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: "It's alive!!!" });
});

app.use('/api/users/', userRouter);
app.use('/api/', authRouter);

module.exports = app;
