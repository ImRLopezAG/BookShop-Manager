const Book = require('../models/bookModel');

exports.GetAllBooks = (req, res, next) => {
  Book.findAll()
    .then((books) => {
      const book = books.map((book) => {
        return book.dataValues;
      });
      res.render('home', {
        book: book,
        pageTitle: 'Books',
        hasBooks: book.length > 0,
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

exports.GetBookDescription = (req, res, next) => {
  Book.findByPk(req.params.id)
    .then((books) => {
      const book = books.dataValues;
      res.render('client/Books/index', {
        books: book,
        pageTitle: book.Name,
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};
