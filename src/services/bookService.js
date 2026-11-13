const bookRepository = require('../repositories/bookRepository');

function listBooks() {
  return bookRepository.findAll();
}

module.exports = { listBooks };
