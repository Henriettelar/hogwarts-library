const Book = require('../models/bookModel');

const initialBooks = [
  { title: 'Advanced Potion-Making' },
  { title: 'Hogwarts: A History' },
  { title: 'The Standard Book of Spells' }
];

function findAll() {
  return Book.find().sort({ title: 1 }).lean();
}

function create(book) {
  return Book.create(book);
}

function findById(id) {
  return Book.findById(id).lean();
}

function borrow(id, studentName) {
  return Book.findOneAndUpdate(
    { _id: id, borrowedBy: null },
    { $set: { borrowedBy: studentName, borrowedAt: new Date() } },
    { new: true, lean: true }
  );
}

function seedBooks() {
  return Promise.all(
    initialBooks.map((book) =>
      Book.updateOne({ title: book.title }, { $setOnInsert: book }, { upsert: true })
    )
  );
}

module.exports = { findAll, create, findById, borrow, seedBooks };
