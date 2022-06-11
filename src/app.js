const express = require('express');
const readersController = require('./controllers/reader');

// const router = express.Router();

const app = express();

app.use(express.json());

app.post('/readers', readersController.create);
app.get('/readers', readersController.findAll);
app.get('/readers/:readerId', readersController.findById);
app.patch('/readers/:readerId', readersController.update);
app.delete('/readers/:readerId', readersController.destroy);

module.exports = app;

