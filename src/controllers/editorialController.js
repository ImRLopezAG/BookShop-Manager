const Editorial = require('../models/editorialModel');
const Book = require('../models/bookModel');

exports.GetAllEditorials = (req, res) => {
  Editorial.findAll().then((editorials) => {
    const editorial = editorials.map((e) => e.dataValues);
    res.render('client/Editorial/index', {
      editorials: editorial,
      pageTitle: 'Editorials',
    });
  });
};

exports.GetEditorialBooks = (req, res) => {
  Book.findAll().then((books) => {
    const book = books.map((b) => b.dataValues);
    Editorial.findByPk(req.params.id).then((editorial) => {
      const editorialBook = book.filter((b) => editorial.Name === b.Editorial);
      res.render('client/Editorial/books', {
        books: editorialBook,
        pageTitle: `${editorial.Name} - Books`,
      });
    });
  });
}