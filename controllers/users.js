const User = require('../models/user');
const {
  VALIDATION_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/errorStatusCodes');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(',')}`,
        });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'An error occured' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(SERVER_ERROR_CODE).send(err));
};

const getUserId = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ Error: `${err.message}` });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ Error: `${err.message}` });
      } else {
        res.status(SERVER_ERROR_CODE).send({ Error: 'An error has occured' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    _id,
    { $set: { name, about } },
    { runValidators: true, new: true }
  )
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ Error: `${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ Error: `${err.message}` });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ Error: `${err.message}` });
      } else {
        res.status(SERVER_ERROR_CODE).send({ Error: 'An error has occured' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { $set: { avatar } },
    { runValidators: true, new: true }
  )
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ Error: `${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ Error: `${err.message}` });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NaN).send({ Error: `${err.message}` });
      } else {
        res.status(SERVER_ERROR_CODE).send({ Error: 'An error has occured' });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
};
