const router = require('express').Router();

// Controller

const bookAdminController = require('../controllers/admin/bookAdminController');
// const authorAdminController = require('../controllers/admin/authorAdminController');
// const categoryAdminController = require('../controllers/admin/categoryAdminController');
// const editorialAdminController = require('../controllers/admin/editorialAdminController');

// Routes

// Books
router.get('/books', bookAdminController.GetAdminBooks);
router.get('/books/create-Books', bookAdminController.GetAddBook);
// router.post('/books/create-Books', bookAdminController.PostAddBook);
// router.get('/books/edit/:BookID', bookAdminController.GetEditBook);
// router.post('/books/edit', bookAdminController.PostEditBook);
// router.post('/books/delete', bookAdminController.PostDeleteBook);

// // Authors
// router.get('/authors', authorAdminController.GetAdminAuthors);
// router.get('/authors/create-Authors', authorAdminController.GetAddAuthor);
// router.post('/authors/create-Authors', authorAdminController.PostAddAuthor);
// router.get('/authors/edit/:AuthorID', authorAdminController.GetEditAuthor);
// router.post('/authors/edit', authorAdminController.PostEditAuthor);
// router.post('/authors/delete', authorAdminController.PostDeleteAuthor);

// // Categories
// router.get('/categories', categoryAdminController.GetAdminCategories);
// router.get(
//   '/categories/create-Categories',
//   categoryAdminController.GetAddCategory
// );
// router.post(
//   '/categories/create-Categories',
//   categoryAdminController.PostAddCategory
// );
// router.get(
//   '/categories/edit/:CategoryID',
//   categoryAdminController.GetEditCategory
// );
// router.post('/categories/edit', categoryAdminController.PostEditCategory);
// router.post('/categories/delete', categoryAdminController.PostDeleteCategory);

// // Editorials
// router.get('/editorials', editorialAdminController.GetAdminEditorials);
// router.get(
//   '/editorials/create-Editorials',
//   editorialAdminController.GetAddEditorial
// );
// router.post(
//   '/editorials/create-Editorials',
//   editorialAdminController.PostAddEditorial
// );
// router.get(
//   '/editorials/edit/:EditorialID',
//   editorialAdminController.GetEditEditorial
// );
// router.post('/editorials/edit', editorialAdminController.PostEditEditorial);
// router.post('/editorials/delete', editorialAdminController.PostDeleteEditorial);

module.exports = router;
