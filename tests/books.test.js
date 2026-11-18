const test = require('node:test');
const assert = require('node:assert/strict');
const bookRepository = require('../src/repositories/bookRepository');
const bookService = require('../src/services/bookService');

test('Issue 1 requires the three initial books', () => {
  const { readFileSync } = require('node:fs');
  const repository = readFileSync('src/repositories/bookRepository.js', 'utf8');

  assert.match(repository, /Advanced Potion-Making/);
  assert.match(repository, /Hogwarts: A History/);
  assert.match(repository, /The Standard Book of Spells/);
});

test('Henter alle bøger', async () => {
  const books = [{ title: 'Hogwarts: A History' }];
  const originalFindAll = bookRepository.findAll;
  bookRepository.findAll = async () => books;

  try {
    assert.deepEqual(await bookService.listBooks(), books);
  } finally {
    bookRepository.findAll = originalFindAll;
  }
});

test('Henter en bestemt bog', async () => {
  const book = { _id: '507f1f77bcf86cd799439011', title: 'Hogwarts: A History' };
  const originalFindById = bookRepository.findById;
  bookRepository.findById = async () => book;

  try {
    assert.deepEqual(await bookService.getBook(book._id), book);
  } finally {
    bookRepository.findById = originalFindById;
  }
});

test('Afviser opslag af en ukendt bog med 404', async () => {
  const originalFindById = bookRepository.findById;
  bookRepository.findById = async () => null;

  try {
    await assert.rejects(() => bookService.getBook('507f1f77bcf86cd799439011'), {
      message: 'Book not found',
      statusCode: 404
    });
  } finally {
    bookRepository.findById = originalFindById;
  }
});

test('Opretter en bog', async () => {
  const book = { _id: '507f1f77bcf86cd799439012', title: '  New Book  ' };
  const originalCreate = bookRepository.create;
  bookRepository.create = async (data) => ({ ...book, title: data.title });

  try {
    assert.deepEqual(await bookService.createBook({ title: book.title }), {
      ...book,
      title: 'New Book'
    });
  } finally {
    bookRepository.create = originalCreate;
  }
});

test('Afviser oprettelse uden titel med 400', async () => {
  await assert.rejects(() => bookService.createBook({}), {
    message: 'Title is required',
    statusCode: 400
  });
});

test('Låner en ledig bog', async () => {
  const book = { _id: '507f1f77bcf86cd799439013', title: 'New Book' };
  const borrowedBook = { ...book, borrowedBy: 'Harry Potter' };
  const originalFindById = bookRepository.findById;
  const originalBorrow = bookRepository.borrow;
  bookRepository.findById = async () => book;
  bookRepository.borrow = async (id, studentName) =>
    id === book._id && studentName === 'Harry Potter' ? borrowedBook : null;

  try {
    assert.deepEqual(await bookService.borrowBook(book._id, ' Harry Potter '), borrowedBook);
  } finally {
    bookRepository.findById = originalFindById;
    bookRepository.borrow = originalBorrow;
  }
});

test('Afviser lån af en optaget bog med 409', async () => {
  const book = { _id: '507f1f77bcf86cd799439014', title: 'New Book' };
  const originalFindById = bookRepository.findById;
  const originalBorrow = bookRepository.borrow;
  bookRepository.findById = async () => book;
  bookRepository.borrow = async () => null;

  try {
    await assert.rejects(() => bookService.borrowBook(book._id, 'Ron Weasley'), {
      message: 'Book is already borrowed',
      statusCode: 409
    });
  } finally {
    bookRepository.findById = originalFindById;
    bookRepository.borrow = originalBorrow;
  }
});

test('Afviser lån uden elevnavn med 400', async () => {
  await assert.rejects(
    () => bookService.borrowBook('507f1f77bcf86cd799439015', ''),
    { message: 'Student name is required', statusCode: 400 }
  );
});
