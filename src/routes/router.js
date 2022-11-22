const router = require('express').Router();

// Controllers

const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const editorialController = require('../controllers/editorialController');
const categoryController = require('../controllers/categoryController');

// Routes

// Books
router.get('/', bookController.GetAllBooks);

// Authors
router.get('/authors', authorController.GetAllAuthors);

// Editorials
router.get('/editorials', editorialController.GetAllEditorials);

// Categories
router.get('/categories', categoryController.GetAllCategories);

module.exports = router;
