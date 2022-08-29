const User = require('../models/user')

//const path = require('path');
//const getDataFromFile = require('../helpers/files');

//const dataPath = path.join(__dirname, '..', 'data', 'users.json');
const createUser = (req, res) => {
const {name, about, avatar} = req.body;
User.create({name, about, avatar})
.then((user) => res.status(201).send({data: user}))
.catch((err) => {
  if(err.name === 'ValidationError') {
    res.status(400).send({message: `${Object.values(err.errors).map((error) => error.message).join(',')}`});
  }else {
    res.status(500).send({message: 'An error occured'})
  }
})
}

const getUsers = (req, res) =>
User.find({})
  //getDataFromFile(dataPath)
    .then((users) => res.status(200).send({data: users}))
    .catch((err) => res.status(500).send(err));

const getUserId = (req, res) =>
User.findById(req.params.id)
  //getDataFromFile(dataPath)
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

module.exports = { createUser, getUsers, getUserId };
