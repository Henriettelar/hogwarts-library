const express = require('express');
const {
  getBooks,
  getBook,
  createBook,
  borrowBook
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.post('/:id/borrow', borrowBook);

module.exports = router;
