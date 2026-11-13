const bookRepository = require('../repositories/bookRepository');

function listBooks() {
  return bookRepository.findAll();
}

function createBook(book) {
  return bookRepository.create(book);
}

async function borrowBook(id, studentName) {
  if (!studentName || !studentName.trim()) {
    const error = new Error('Student name is required');
    error.statusCode = 400;
    throw error;
  }

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  const book = await bookRepository.findById(id);
  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  const borrowedBook = await bookRepository.borrow(id, studentName.trim());
  if (!borrowedBook) {
    const error = new Error('Book is already borrowed');
    error.statusCode = 409;
    throw error;
  }

  return borrowedBook;
}

module.exports = { listBooks, createBook, borrowBook };
