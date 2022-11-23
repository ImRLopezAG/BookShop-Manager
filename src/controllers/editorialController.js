const Editorial = require('../models/editorialModel');
const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');
const Author = require('../models/authorModel');

exports.GetAllEditorials = (req, res) => {
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((category) => category.dataValues);
    Author.findAll().then((authors) => {
      const authorArray = authors.map((author) => author.dataValues);
      Editorial.findAll().then((editorials) => {
        const editorial = editorials.map((editorial) => editorial.dataValues);
        res.render('client/Editorial/index', {
          editorials: editorial,
          pageTitle: 'Editorials',
          categories: categoryArray,
          authors: authorArray,
          hasEditorials: editorial.length > 0,
          hasCategories: categoryArray.length > 0,
          hasAuthors: authorArray.length > 0,
        });
      });
    });
  });
};

exports.GetEditorialBooks = (req, res) => {
  Book.findAll().then((books) => {
    const book = books.map((b) => b.dataValues);
    Category.findAll().then((categories) => {
      const category = categories.map((c) => c.dataValues);
      Author.findAll().then((authors) => {
        const author = authors.map((a) => a.dataValues);
        Editorial.findOne({ where: { Name: req.params.Name } }).then(
          (editorial) => {
            const booksEditorial = book.filter(
              (b) => editorial.Name === b.Editorial
            );
            res.render('client/Editorial/books', {
              books: booksEditorial,
              editorials: editorial,
              authors: author,
              categories: category,
              editorial: editorial.Name,
              pageTitle: `${editorial.Name} - Books`,
              hasBooks: booksEditorial.length > 0,
              hasCategories: category.length > 0,
              hasAuthors: author.length > 0,
            });
          }
        );
      });
    });
  });
};
