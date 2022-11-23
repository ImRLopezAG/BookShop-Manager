const Editorial = require('../models/editorialModel');
const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');

exports.GetAllEditorials = (req, res) => {
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((category) => category.dataValues);
    Editorial.findAll().then((editorials) => {
      const editorial = editorials.map((editorial) => editorial.dataValues);
      res.render('client/Editorial/index', {
        editorials: editorial,
        pageTitle: 'Editorials',
        hasEditorials: editorial.length > 0,
        categories: categoryArray,
        hasCategories: categoryArray.length > 0,
      });
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
};
