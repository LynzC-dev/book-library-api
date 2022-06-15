const express = require('express');
const readersController = require('./controllers/reader');
const booksController = require('./controllers/book');

// const router = express.Router();

const app = express();

app.use(express.json());

app.post('/readers', readersController.create);
app.get('/readers', readersController.findAll);
app.get('/readers/:readerId', readersController.findById);
app.patch('/readers/:readerId', readersController.update);
app.delete('/readers/:readerId', readersController.destroy);

app.post('/books', booksController.create);
app.get('/books', booksController.findAll);
app.get('/books/:bookId', booksController.findById);
app.patch('/books/:bookId', booksController.update);
app.delete('/books/:bookId', booksController.destroy);

module.exports = app;

