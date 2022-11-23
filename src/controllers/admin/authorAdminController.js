const Author = require('../../models/authorModel');

exports.GetAdminAuthors = (req, res) => {
  Author.findAll().then((authors) => {
    const authorsArray = authors.map((author) => {
      return author.dataValues;
    });
    res.render('admin/Authors/admin', {
      authors: authorsArray,
      pageTitle: 'Admin Authors',
      hasAuthors: authorsArray.length > 0,
    });
  });
};

exports.GetAddAuthor = (req, res) => {
  res.render('admin/Authors/editAuthor', {
    pageTitle: 'Add Author',
    editMode: false,
  });
};

exports.PostAddAuthor = (req, res) => {
  let created = req.body.AuthorCreate;
  const name = req.body.Name;
  const email = req.body.Email;
  function Validate() {
    isValid = true;
    if (name == '' || name == null || name == undefined) {
      isValid = false;
    }
    if (email == '' || email == null || email == undefined) {
      isValid = false;
    }
    return isValid;
  }

  if (Validate()) {
    console.log(created);
    Author.create({
      Name: name,
      Email: email,
    }).then(() => {
      console.log(created);
      res.redirect('/admin/authors');
    });
  } else {
    created = '';
    console.trace(created);
  }
};

exports.GetEditAuthor = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/admin/authors/admin');
  }
  Author.findOne({ where: { id: req.params.AuthorID } }).then((author) => {
    const authorData = author.dataValues;
    res.render('admin/Authors/editAuthor', {
      pageTitle: 'Edit Author',
      author: authorData,
      editMode: editMode,
    });
  });
};

exports.PostEditAuthor = (req, res) => {
  const name = req.body.Name;
  const email = req.body.Email;
  const authorId = req.body.AuthorId;

  Author.update(
    {
      Name: name,
      Email: email,
    },
    { where: { id: authorId } }
  ).then(() => {
    res.redirect('/admin/authors');
  });
};

exports.PostDeleteAuthor = (req, res) => {
  const authorId = req.body.AuthorId;
  Author.destroy({ where: { id: authorId } }).then(() => {
    console.log(`Author with the Id ${authorId} deleted`);
    res.redirect('/admin/authors');
  });
};
