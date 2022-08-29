const express = require('express');

const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const indexRouter = require('./routes/index');
//const { use } = require('./routes/users');

const { PORT = 3000 } = process.env;

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/aroundb')

app.use((req, res, next) => {
req.user = {_id:'5d8b8592978f8bd833ca8133'};
next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', indexRouter);

app.listen(PORT);
