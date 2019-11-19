const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../src/routers/auth-router');
const userRouter = require('../src/routers/user-router');
const boardRouter = require('../src/routers/board-router');
const todoRouter = require('../src/routers/todos-router');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: "It's alive!!!" });
});

app.use('/api/auth/', authRouter);
app.use('/api/users/', userRouter);
app.use('/api/boards/', boardRouter);
app.use('/api/todos/', todoRouter);

module.exports = app;
