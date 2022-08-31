const router = require('express').Router();
const { NOT_FOUND_ERROR_CODE } = require('../utils/errorStatusCodes');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: 'Requested resource not found' });
});

module.exports = router;
