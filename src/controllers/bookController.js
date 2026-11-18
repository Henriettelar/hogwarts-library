const bookService = require('../services/bookService');

async function getBooks(request, response, next) {
  try {
    const books = await bookService.listBooks();
    response.json(books);
  } catch (error) {
    next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const book = await bookService.createBook(request.body);
    response.status(201).json(book);
  } catch (error) {
    next(error);
  }
}

async function borrowBook(request, response, next) {
  try {
    const book = await bookService.borrowBook(
      request.params.id,
      request.body && request.body.studentName
    );
    response.json(book);
  } catch (error) {
    next(error);
  }
}

module.exports = { getBooks, createBook, borrowBook };
