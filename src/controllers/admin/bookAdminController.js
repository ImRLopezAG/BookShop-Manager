const Book = require('../../models/bookModel');

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
  res.render('admin/Books/editBook', {
    pageTitle: 'Create Book',
    editMode: false,
  });
};

exports.PostAddBook = (req, res) => {
  let created = req.body.BookCreate;
  const name = req.body.Name;
  const author = req.body.Author;
  const description = req.body.Description;
  const image = req.body.Image;
  const category = req.body.Category;
  const year = req.body.Year;
  const editorial = req.body.Editorial;
  const pages = req.body.Pages;

  function Validate() {
    isValid = true;
    if (name == '' || name == null || name == undefined) {
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
  }

  if (Validate()) {
    Book.create({
      Name: name,
      Author: author,
      Description: description,
      Image: image,
      Category: category,
      Year: year,
      Editorial: editorial,
      Pages: pages,
    }).then(() => {
      res.redirect('/');
    });
  } else {
    created = 1;
  }
};
