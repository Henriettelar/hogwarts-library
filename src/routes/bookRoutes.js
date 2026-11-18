const express = require('express');
const {
  getBooks,
  createBook,
  borrowBook
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.post('/:id/borrow', borrowBook);

module.exports = router;
