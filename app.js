const express = require('express');

const app = express();
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const indexRouter = require('./routes/indes');

const { PORT = 3000 } = process.env;

app.use(helmet());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', indexRouter);

app.listen(PORT);
