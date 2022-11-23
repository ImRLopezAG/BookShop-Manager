const Author = require('../models/authorModel.js');
const Book = require('../models/bookModel.js');
const Category = require('../models/categoryModel.js');
const Editorial = require('../models/editorialModel.js');

exports.GetAllAuthors = (req, res) => {
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((category) => category.dataValues);
    Author.findAll().then((authors) => {
      const author = authors.map((author) => {
        return author.dataValues;
      });
      Editorial.findAll().then((editorials) => {
        const editorial = editorials.map((editorial) => editorial.dataValues);
        res.render('client/Author/index', {
          authors: author,
          pageTitle: 'Authors',
          categories: categoryArray,
          editorials: editorial,
          hasAuthors: author.length > 0,
          hasCategories: categoryArray.length > 0,
          hasEditorials: editorial.length > 0,
        });
      });
    });
  });
};

exports.GetAuthorBooks = (req, res) => {
  Book.findAll().then((books) => {
    const book = books.map((b) => b.dataValues);
    Category.findAll().then((categories) => {
      const category = categories.map((c) => c.dataValues);
      Editorial.findAll().then((editorials) => {
        const editorial = editorials.map((e) => e.dataValues);
        Author.findOne({ where: { Name: req.params.Name } }).then((author) => {
          const authorBook = book.filter((b) => author.Name === b.Author);
          res.render('client/Author/books', {
            books: authorBook,
            authors: author,
            editorials: editorial,
            pageTitle: `${author.Name} - Books`,
            hasAuthors: author.length > 0,
            hasBooks: authorBook.length > 0,
            hasEditorials: editorial.length > 0,
            categories: category,
            hasCategories: category.length > 0,
            author: author.Name,
          });
        });
      });
    });
  });
};
