const e = require('express');
const Author = require('../../models/authorModel');
const Category = require('../../models/categoryModel');
const Editorial = require('../../models/editorialModel');
const transporter = require('../../service/emailService');

exports.GetAdminAuthors = (req, res) => {
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
        res.render('admin/Authors/admin', {
          title: 'Authors',
          authors: authorsArray,
          categories: categoriesArray,
          editorials: editorialArray,
          hasAuthors: authorsArray.length > 0,
          hasCategories: categoriesArray.length > 0,
          hasEditorials: editorialArray.length > 0,
        });
      });
    });
  });
};

exports.GetAddAuthor = (req, res) => {
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
        res.render('admin/Authors/editAuthor', {
          title: 'Authors',
          authors: authorsArray,
          categories: categoriesArray,
          editorials: editorialArray,
          hasAuthors: authorsArray.length > 0,
          hasCategories: categoriesArray.length > 0,
          hasEditorials: editorialArray.length > 0,
          editMode: false,
        });
      });
    });
  });
};

exports.PostAddAuthor = (req, res) => {
  const name = req.body.Name;
  const email = req.body.Email;
  const image = req.file;
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

  if (!image) {
    return res.redirect('/admin/authors');
  }

  if (Validate()) {
    Author.create({
      Name: name,
      Email: email,
      Image: '/' + image.filename,
    }).then((result) => {
      res.redirect('/admin/authors');
      return transporter
        .sendMail({
          to: email,
          from: 'Book Shop Manager - Welcome',
          subject: `Welcome to Book Shop ${name}`,
          html: `<h1>Author Created</h1>
        <p>Dear ${name},</p>
        <p>You have been added as an author to the Book Shop.</p>
        <p>Thank you for your time.</p>
        <p>visit <a href="https://github.com/LopezAG17">@Angel Lopez</a> to see more projects</p>
        <p>Regards,</p>
        <p>Book Shop Manager</p>
        `,
        })
        .catch((err) => {
          console.trace(err);
        });
    });
  } else {
    res.redirect('/admin/authors');
  }
};

exports.GetEditAuthor = (req, res) => {
  const editMode = req.query.edit;

  Category.findAll().then((categories) => {
    const categoriesArray = categories.map((category) => {
      return category.dataValues;
    });
    Editorial.findAll().then((editorials) => {
      const editorialArray = editorials.map((editorial) => {
        return editorial.dataValues;
      });
      const authorId = req.params.authorId;
      Author.findByPk(authorId).then((author) => {
        Author.findAll().then((authors) => {
          const authorsArray = authors.map((author) => {
            return author.dataValues;
          });
          res.render('admin/Authors/editAuthors', {
            title: 'Authors',
            authors: authorsArray,
            categories: categoriesArray,
            editorials: editorialArray,
            hasAuthors: authorsArray.length > 0,
            hasCategories: categoriesArray.length > 0,
            hasEditorials: editorialArray.length > 0,
            editMode: editMode,
          });
        });
      });
    });
  });
};

exports.PostEditAuthor = (req, res) => {
  const authorId = req.body.AuthorId;
  const name = req.body.Name;
  const email = req.body.Email;
  const imagePath = req.file;

  Author.findOne({ where: { id: authorId } }).then((author) => {
    const authorData = author.dataValues;

    if (!authorData) {
      return res.redirect('/admin/authors');
    }
    const image = imagePath ? '/' + imagePath.filename : authorData.Image;

    Author.update(
      {
        Name: name,
        Email: email,
        Image: image,
      },
      { where: { id: authorId } }
    ).then(() => {
      res.redirect('/admin/authors');

      return transporter
        .sendMail({
          to: email,
          from: 'Book Shop Manager - Update',
          subject: `Welcome to Book Shop ${name}`,
          html: `<h1>Author Updated</h1>
        <p>Dear ${name},</p>
        <p>You have been updated as an author to the Book Shop.</p>
        <p>Thank you for your time.</p>
        <p>visit <a href="https://github.com/LopezAG17">@Angel Lopez</a> to see more projects</p>
        <p>Regards,</p>
        <p>Book Shop Manager</p>`,
        })
        .catch((err) => {
          console.trace(err);
        });
    });
  });
};

exports.PostDeleteAuthor = (req, res) => {
  const authorId = req.body.AuthorId;
  const email = req.body.AuthorEmail;
  const name = req.body.AuthorName;
  Author.destroy({ where: { id: authorId } }).then(() => {
    res.redirect('/admin/authors');
    return transporter
      .sendMail({
        to: email,
        from: 'Book Shop Manager - Delete',
        subject: `Welcome to Book Shop ${name}`,
        html: `<h1>Author Deleted</h1>
        <p>Dear ${name},</p>
        <p>You have been deleted as an author to the Book Shop.</p>
        <p>Thank you for your time.</p>
        <p>visit <a href="https://github.com/LopezAG17">@Angel Lopez</a> to see more projects</p>
        <p>Regards,</p>
        <p>Book Shop Manager</p>`,
      })
      .catch((err) => {
        console.trace(err);
      });
  });
};
