const router = require('express').Router();

// Controllers

const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const editorialController = require('../controllers/editorialController');
const categoryController = require('../controllers/categoryController');

// Routes

// Books
router.get('/', bookController.GetAllBooks);
router.post('/books/search', bookController.GetBooksByTitle);
router.get('/books/:BookTitleCard', bookController.GetBooksDescription);
// Authors
router.get('/authors', authorController.GetAllAuthors);
router.get('/book/authors/:Name', authorController.GetAuthorBooks);

// Editorials
router.get('/editorials', editorialController.GetAllEditorials);
router.get('/book/editorials/:Name', editorialController.GetEditorialBooks);

// Categories
router.get('/categories', categoryController.GetAllCategories);
router.get('/book/categories/:Name', categoryController.GetCategoryBooks);

module.exports = router;
