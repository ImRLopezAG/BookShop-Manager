const Book = require('../../models/bookModel');
const Author = require('../../models/authorModel');
const Editorial = require('../../models/editorialModel');
const Category = require('../../models/categoryModel');

exports.GetAdminBooks = (req, res) => {
  Category.findAll().then((categories) => {
    const categoriesArray = categories.map((category) => {
      return category.dataValues;
    });
    Editorial.findAll().then((editorials) => {
      const editorialArray = editorials.map((editorial) => {
        return editorial.dataValues;
      });
      Author.findAll().then((authors) => {
        const authorsArray = authors.map((author) => {
          return author.dataValues;
        });
        Book.findAll().then((books) => {
          const booksArray = books.map((book) => {
            return book.dataValues;
          });
          res.render('admin/Books/admin', {
            title: 'Books',
            books: booksArray,
            authors: authorsArray,
            categories: categoriesArray,
            editorials: editorialArray,
            hasBooks: booksArray.length > 0,
            hasCategories: categoriesArray.length > 0,
            hasEditorials: editorialArray.length > 0,
          });
        });
      });
    });
  });
};

exports.GetAddBook = (req, res) => {
  Author.findAll().then((authors) => {
    const authorsArray = authors.map((author) => {
      return author.dataValues;
    });
    Editorial.findAll().then((editorials) => {
      const editorialsArray = editorials.map((editorial) => {
        return editorial.dataValues;
      });
      Category.findAll().then((categories) => {
        const categoriesArray = categories.map((category) => {
          return category.dataValues;
        });
        res.render('admin/Books/editBook', {
          pageTitle: 'Add Book',
          hasAuthors: authorsArray.length > 0,
          hasEditorials: editorialsArray.length > 0,
          hasCategories: categoriesArray.length > 0,
          authors: authorsArray,
          editorials: editorialsArray,
          categories: categoriesArray,
          editMode: false,
        });
      });
    });
  });
};

exports.PostAddBook = (req, res) => {
  const title = req.body.Title;
  const author = req.body.Author;
  const image = req.file;
  const category = req.body.Category;
  const year = req.body.Year;
  const editorial = req.body.Editorial;
  const pages = req.body.Pages;
  const description = req.body.Description;

  function Validate() {
    isValid = true;
    if (title == null || title == undefined || title == '') {
      isValid = false;
    }
    if (author == null || author == undefined || author == '') {
      isValid = false;
    }
    if (category == null || category == undefined || category == '') {
      isValid = false;
    }
    if (year == null || year == undefined || year == '') {
      isValid = false;
    }
    if (editorial == null || editorial == undefined || editorial == '') {
      isValid = false;
    }
    if (pages == null || pages == undefined || pages == '') {
      isValid = false;
    }
    if (description == null || description == undefined || description == '') {
      isValid = false;
    }
    return isValid;
  }

  if (!image) {
    return res.redirect('/admin/books');
  }
  if (Validate()) {
    Book.create({
      Title: title,
      Author: author,
      Image: '/' + image.filename,
      Category: category,
      Year: year,
      Editorial: editorial,
      Pages: pages,
      Description: description,
    }).then(() => {
      res.redirect('/admin/books');
    });
  }
};

exports.GetEditBook = (req, res) => {
  const bookId = req.params.BookId;
  const editMode = req.query.edit;
  Author.findAll().then((authors) => {
    const authorsArray = authors.map((author) => {
      return author.dataValues;
    });
    Editorial.findAll().then((editorials) => {
      const editorialsArray = editorials.map((editorial) => {
        return editorial.dataValues;
      });
      Category.findAll().then((categories) => {
        const categoriesArray = categories.map((category) => {
          return category.dataValues;
        });
        Book.findOne({ where: { id: bookId } })
          .then((book) => {
            if (!book) {
              return res.redirect('/');
            }
            res.render('admin/Books/editBook', {
              pageTitle: 'Edit Book',
              book: book,
              editMode: editMode,
              hasAuthors: authorsArray.length > 0,
              hasEditorials: editorialsArray.length > 0,
              hasCategories: categoriesArray.length > 0,
              authors: authorsArray,
              editorials: editorialsArray,
              categories: categoriesArray,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  });
};

exports.PostEditBook = (req, res) => {
  const bookId = req.body.BookId;
  const title = req.body.Title;
  const description = req.body.Description;
  const author = req.body.Author;
  const year = req.body.Year;
  const pages = req.body.Pages;
  const editorial = req.body.Editorial;
  const category = req.body.Category;
  const imagePath = req.file;

  Book.findOne({ where: { id: bookId } }).then((book) => {
    const bookData = book.dataValues;

    if (!bookData) {
      res.redirect('/admin/books');
    }

    const image = imagePath ? '/' + imagePath.filename : bookData.Image;

    Book.update(
      {
        Title: title,
        Description: description,
        Author: author,
        Year: year,
        Pages: pages,
        Editorial: editorial,
        Category: category,
        Image: image,
      },
      { where: { id: bookId } }
    ).then(() => {
      res.redirect('/admin/books');
    });
  });
};

exports.PostDeleteBook = (req, res) => {
  const bookId = req.body.BookId;
  Book.destroy({ where: { id: bookId } }).then(() => {
    res.redirect('/admin/books');
  });
};
