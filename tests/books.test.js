const test = require('node:test');
const assert = require('node:assert/strict');

test('Issue 1 requires the three initial books', () => {
  const { readFileSync } = require('node:fs');
  const repository = readFileSync('src/repositories/bookRepository.js', 'utf8');

  assert.match(repository, /Advanced Potion-Making/);
  assert.match(repository, /Hogwarts: A History/);
  assert.match(repository, /The Standard Book of Spells/);
});


