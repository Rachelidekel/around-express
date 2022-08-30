const express = require('express');

const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const indexRouter = require('./routes/index');

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  req.user = { _id: '630ce8753a99444882d64fe9' };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', indexRouter);

app.listen(PORT);
