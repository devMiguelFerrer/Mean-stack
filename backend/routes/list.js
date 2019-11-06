const express = require('express');

const {
  listUsers,
  addUser,
  deleteUser,
  updateUser,
  resetUserDB
} = require('../controllers/list');

const router = express.Router();

router
  .route('/')
  .get(listUsers)
  .post(addUser);

router.route('/db/:miguel').delete(resetUserDB);

router
  .route('/:id')
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
