const router = require('express').Router();
const { getUsers, getUserId } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:user_id', getUserId);

module.exports = router;
