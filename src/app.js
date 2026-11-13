//Til brug af .env.example filen
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { seedBooks } = require('./repositories/bookRepository');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/books', bookRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const mongoUri =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hogwarts-library';

mongoose
  .connect(mongoUri)
  .then(() => seedBooks())
  .then(() => {
    app.listen(port, () => {
      console.log(`Hogwarts library API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:', error);
    process.exitCode = 1;
  });
