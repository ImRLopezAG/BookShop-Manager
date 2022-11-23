const Book = require('../../models/bookModel');
const Author = require('../../models/authorModel');
const Editorial = require('../../models/editorialModel');
const Category = require('../../models/categoryModel');

exports.GetAdminBooks = (req, res) => {
  Book.findAll().then((books) => {
    const booksArray = books.map((book) => {
      return book.dataValues;
    });
    res.render('admin/Books/admin', {
      books: booksArray,
      pageTitle: 'Admin Books',
      hasBooks: booksArray.length > 0,
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
  let created = req.body.BookCreate;
  const title = req.body.Title;
  const author = req.body.Author;
  const image = req.body.Image;
  const category = req.body.Category;
  const year = req.body.Year;
  const editorial = req.body.Editorial;
  const pages = req.body.Pages;
  const description = req.body.Description;

  function Validate() {
    isValid = true;
    if (title == '' || title == null || title == undefined) {
      isValid = false;
    }
    if (author == '' || author == null || author == undefined) {
      isValid = false;
    }
    if (description == '' || description == null || description == undefined) {
      isValid = false;
    }
    if (image == '' || image == null || image == undefined) {
      isValid = false;
    }
    if (category == '' || category == null || category == undefined) {
      isValid = false;
    }
    if (year == '' || year == null || year == undefined) {
      isValid = false;
    }
    if (editorial == '' || editorial == null || editorial == undefined) {
      isValid = false;
    }
    if (pages == '' || pages == null || pages == undefined) {
      isValid = false;
    }
    return isValid;
    console.log(isValid);
  }

  if (Validate()) {
    Book.create({
      Title: title,
      Author: author,
      Image: image,
      Category: category,
      Year: year,
      Editorial: editorial,
      Pages: pages,
      Description: description,
    }).then(() => {
      res.redirect('/admin/books');
    });
  } else {
    created = 1;
  }
};

exports.GetEditBook = (req, res) => {
  const bookId = req.params.BookId;
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
              editMode: true,
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
  const updatedTitle = req.body.Title;
  const updatedDescription = req.body.Description;
  const updatedAuthor = req.body.Author;
  const updatedYear = req.body.Year;
  const updatedPages = req.body.Pages;
  const updatedEditorial = req.body.Editorial;
  const updatedCategory = req.body.Category;
  const updatedImage = req.body.Image;

  Book.update(
    {
      Title: updatedTitle,
      Description: updatedDescription,
      Author: updatedAuthor,
      Year: updatedYear,
      Pages: updatedPages,
      Editorial: updatedEditorial,
      Category: updatedCategory,
      Image: updatedImage,
    },
    { where: { id: req.body.BookId } }
  )
    .then(() => {
      res.redirect('/admin/books');
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};

exports.PostDeleteBook = (req, res) => {
  const bookId = req.body.BookId;
  Book.findByPk(bookId)
    .then((book) => {
      return book.destroy();
    })
    .then(() => {
      res.redirect('/admin/books');
    });
};
