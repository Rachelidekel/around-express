const Card = require('../models/card');

const getCards = (req, res) =>
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
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

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => card.deleteOne(card).then(() => res.send({ data: card })))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else if (err.statusCode === 404) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'An error has occured' });
      }
    });
};

const updateLike = (req, res, method) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { [method]: { likes: req.user._id } },
    { new: true }
  );
  orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = 404;
    throw error;
  })
    .then((card) => card.deleteOne(card).then(() => res.send({ data: card })))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else if (err.statusCode === 404) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'An error has occured' });
      }
    });
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');

const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
