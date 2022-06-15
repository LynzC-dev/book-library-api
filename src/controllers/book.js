const { Book } = require('../models');

exports.create = async (req, res) => {
 const newBook = await Book.create(req.body);
 res.status(201).json(newBook);
};

exports.findAll = async(req, res) => {
    const books = await Book.findAll({where: req.query});
    res.status(200).json(books);
};

exports.findById = async (req, res) => {
    const {bookId} = req.params;
    const book = await Book.findByPk(bookId);
    if(!book) {
      res.status(404).json({ error:'The book could not be found.'});
    } else {
      res.status(200).json(book);
    }
  };

  exports.update = async (req, res) => {
      const { bookId } = req.params;
      const updateData  = req.body;
      const [ updatedRows] = await Book.update(updateData, {where: { id: bookId } });
    if(!updatedRows) {
        res.status(404).json({ error:'The book could not be found.'});
      } else {
        res.status(200).json();
      }
  };

  exports.destroy = async (req, res) => {
      const { bookId } = req.params;
      const deletedRows = await Book.destroy( {where: { id: bookId }});
      if(!deletedRows) {
        res.status(404).json({ error:'The book could not be found.'});
      } else {
        res.status(204).json();
      };
  };
