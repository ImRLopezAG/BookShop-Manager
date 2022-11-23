const Category = require('../models/categoryModel');
const Book = require('../models/bookModel');
const Editorial = require('../models/editorialModel');
const Author = require('../models/authorModel');

exports.GetAllCategories = (req, res) => {
  Book.findAll().then((books) => {
    const book = books.map((b) => b.dataValues);
    Author.findAll().then((authors) => {
      const author = authors.map((a) => a.dataValues);
      Editorial.findAll().then((editorials) => {
        const editorial = editorials.map((e) => e.dataValues);
        Category.findAll().then((categories) => {
          const category = categories.map((cat) => cat.dataValues);
          res.render('client/Category/index', {
            books: book,
            authors: author,
            editorials: editorial,
            categories: category,
            pageTitle: 'Categories',
            hasCategories: category.length > 0,
            hasBooks: book.length > 0,
            hasAuthors: author.length > 0,
            hasEditorials: editorial.length > 0,
          });
        });
      });
    });
  });
};

exports.GetCategoryBooks = (req, res) => {
  const name = req.params.Name;
  Book.findAll().then((books) => {
    const book = books.map((b) => b.dataValues);
    Author.findAll().then((authors) => {
      const author = authors.map((a) => a.dataValues);
      Editorial.findAll().then((editorials) => {
        const editorial = editorials.map((e) => e.dataValues);
        Category.findOne({ where: { Name: name } }).then((category) => {
          const categoryBook = book.filter((b) => category.Name === b.Category);
          res.render('client/Category/books', {
            books: categoryBook,
            authors: author,
            editorials: editorial,
            pageTitle: `${category.Name} - Books`,
            category: category.Name,
            hasBooks: categoryBook.length > 0,
            hasAuthors: author.length > 0,
            hasEditorials: editorial.length > 0,
          });
        });
      });
    });
  });
};
