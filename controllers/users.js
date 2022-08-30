const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(',')}`,
        });
      } else {
        res.status(500).send({ message: 'An error occured' });
      }
    });
};

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send(err));

const getUserId = (req, res) =>
  User.findById(req.params.id)
    .then((users) => users.find((user) => user._id === req.params.user_id))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch(() =>
      res.status(500).send({ message: 'Requested resource not found' })
    );

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
      error.statusCode = 404;
      throw error;
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ Error: `${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ Error: `${err.message}` });
      } else if (err.statusCode === 404) {
        res.status(404).send({ Error: `${err.message}` });
      } else {
        res.status(500).send({ Error: 'An error has occured' });
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
      error.statusCode = 404;
      throw error;
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ Error: `${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ Error: `${err.message}` });
      } else if (err.statusCode === 404) {
        res.status(404).send({ Error: `${err.message}` });
      } else {
        res.status(500).send({ Error: 'An error has occured' });
      }
    });
};

//const updateUserData = (res, req) => {

//}
//const updateFields = ['name', 'about'];

//const updateUserInfo = (req, res) => {
//User.findByIdAndUpdate(req.params.id)
//}

//const updateUserAvatar = (req, res) => {
//User.findByIdAndUpdate(req.params.id)
//}

module.exports = {
  createUser,
  getUsers,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
};
