const Author = require('../models/authorModel.js');
const Book = require('../models/bookModel.js');

exports.GetAllAuthors = (req, res) => {
  Author.findAll().then((authors) => {
    const author = authors.map((author) => {
      return author.dataValues;
    });
    res.render('client/Author/index', {
      authors: author,
      pageTitle: 'Authors',
    });
  });
};

exports.GetAuthorBooks = (req, res) => {
  Book.findAll().then((books) => {
    const book = books.map((book) => {
      return book.dataValues;
    });
    Author.findByPk(req.params.id).then((author) => {
      const authorBook = book.filter((books) => {
        return author.Name === books.Author;
      });
      res.render('client/Author/books', {
        books: authorBook,
        pageTitle: `${author.Name} - Books`,
      });
    });
  });
};
