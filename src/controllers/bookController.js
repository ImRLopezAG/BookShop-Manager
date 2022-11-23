const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');

exports.GetAllBooks = (req, res, next) => {
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((cat) => cat.dataValues);
    Book.findAll()
      .then((books) => {
        const book = books.map((book) => {
          return book.dataValues;
        });
        res.render('home', {
          book: book,
          pageTitle: 'Books',
          categories : categoryArray,
          hasBooks: book.length > 0,
          hasCategories: categoryArray.length > 0,
        });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
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
