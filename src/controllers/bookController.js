const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');
const Editorial = require('../models/editorialModel');
const Author = require('../models/authorModel');

exports.GetAllBooks = (req, res, next) => {
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((cat) => cat.dataValues);
    Book.findAll().then((books) => {
      const book = books.map((book) => {
        return book.dataValues;
      });
      Editorial.findAll().then((editorials) => {
        const editorial = editorials.map((editorial) => editorial.dataValues);
        Author.findAll()
          .then((authors) => {
            const author = authors.map((author) => author.dataValues);
            res.render('home', {
              pageTitle: 'Books',
              books: book,
              categories: categoryArray,
              editorials: editorial,
              authors: author,
              hasBooks: book.length > 0,
              hasCategories: categoryArray.length > 0,
              hasEditorials: editorial.length > 0,
              hasAuthors: author.length > 0,
            });
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      });
    });
  });
};

exports.GetBooksByTitle = (req, res, next) => {
  const title = req.body.BookTitle;
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((cat) => cat.dataValues);
    Book.findAll({ where: { Title: { [Op.like]: '%' + title + '%' } } }).then(
      (books) => {
        const book = books.map((book) => {
          return book.dataValues;
        });
        Editorial.findAll().then((editorials) => {
          const editorial = editorials.map((editorial) => editorial.dataValues);
          Author.findAll()
            .then((authors) => {
              const author = authors.map((author) => author.dataValues);
              res.render('home', {
                pageTitle: 'Books',
                books: book,
                categories: categoryArray,
                editorials: editorial,
                authors: author,
                hasBooks: book.length > 0,
                hasCategories: categoryArray.length > 0,
                hasEditorials: editorial.length > 0,
                hasAuthors: author.length > 0,
              });
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        });
      }
    );
  });
};

exports.GetBooksDescription = (req, res, next) => {
  const title = req.params.BookTitleCard;
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((cat) => cat.dataValues);
    Author.findAll().then((authors) => {
      const author = authors.map((author) => author.dataValues);
      Editorial.findAll().then((editorials) => {
        const editorial = editorials.map((editorial) => editorial.dataValues);
        Book.findOne({ where: { Title: title } }).then((book) => {
          const bookData = book.dataValues;
          console.log(bookData);
          if (!bookData) {
            return res.redirect('/');
          }
          res.render('client/Books/details', {
            pageTitle: bookData.Title,
            title: bookData.Title,
            book: bookData,
            hasBooks: bookData.length > 0,
            hasCategories: categoryArray.length > 0,
            hasEditorials: editorial.length > 0,
            hasAuthors: author.length > 0,
            categories: categoryArray,
            editorials: editorial,
            authors: author,
          });
        });
      });
    });
  });
};
