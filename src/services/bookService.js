const bookRepository = require('../repositories/bookRepository');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function listBooks() {
  return bookRepository.findAll();
}

async function getBook(id) {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw createError('Book not found', 404);
  }

  const book = await bookRepository.findById(id);
  if (!book) {
    throw createError('Book not found', 404);
  }

  return book;
}

async function createBook(book) {
  if (!book || typeof book.title !== 'string' || !book.title.trim()) {
    throw createError('Title is required', 400);
  }

  try {
    return await bookRepository.create({ title: book.title.trim() });
  } catch (error) {
    if (error.code === 11000) {
      throw createError('A book with this title already exists', 409);
    }
    throw error;
  }
}

async function borrowBook(id, studentName) {
  if (typeof studentName !== 'string' || !studentName.trim()) {
    throw createError('Student name is required', 400);
  }

  const book = await getBook(id);
  const borrowedBook = await bookRepository.borrow(book._id, studentName.trim());
  if (!borrowedBook) {
    throw createError('Book is already borrowed', 409);
  }

  return borrowedBook;
}

module.exports = { listBooks, getBook, createBook, borrowBook };
