const Book = require('../models/bookModel');

const initialBooks = [
  { title: 'Advanced Potion-Making' },
  { title: 'Hogwarts: A History' },
  { title: 'The Standard Book of Spells' }
];

function findAll() {
  return Book.find().sort({ title: 1 }).lean();
}

function seedBooks() {
  return Promise.all(
    initialBooks.map((book) =>
      Book.updateOne({ title: book.title }, { $setOnInsert: book }, { upsert: true })
    )
  );
}

module.exports = { findAll, seedBooks };
