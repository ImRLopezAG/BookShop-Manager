const Category = require('../models/categoryModel');
const Book = require('../models/bookModel');

exports.GetAllCategories = (req, res) => {
  Category.findAll().then((categories) => {
    const category = categories.map((cat) => cat.dataValues);
    res.render('client/Category/index', {
      categories: category,
      pageTitle: 'Categories',
      hasCategories: category.length > 0,
    });
  });
};

exports.GetCategoryBooks = (req, res) => {
  Book.findAll().then((books) => {
    const book = books.map((b) => b.dataValues);
    Category.findByPk(req.params.id).then((category) => {
      const categoryBook = book.filter((b) => category.Name === b.Category);
      res.render('client/Category/books', {
        books: categoryBook,
        pageTitle: `${category.Name} - Books`,
      });
    });
  });
};
