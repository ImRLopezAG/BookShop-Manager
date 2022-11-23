const Editorial = require('../../models/editorialModel');
const Author = require('../../models/authorModel');
const Category = require('../../models/categoryModel');

exports.GetAdminEditorials = (req, res, next) => {
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((category) => category.dataValues);
    Editorial.findAll().then((editorials) => {
      const editorial = editorials.map((editorial) => editorial.dataValues);
      Author.findAll().then((authors) => {
        const author = authors.map((author) => author.dataValues);
        res.render('admin/Editorial/admin', {
          title: 'Editorials',
          editorials: editorial,
          categories: categoryArray,
          authors: author,
          hasEditorials: editorial.length > 0,
          hasCategories: categoryArray.length > 0,
          hasAuthors: author.length > 0,
        });
      });
    });
  });
};

exports.GetAddEditorial = (req, res, next) => {
  Category.findAll().then((categories) => {
    const categoryArray = categories.map((category) => category.dataValues);
    Editorial.findAll().then((editorials) => {
      const editorial = editorials.map((editorial) => editorial.dataValues);
      Author.findAll().then((authors) => {
        const author = authors.map((author) => author.dataValues);
        res.render('admin/Editorial/editEditorial', {
          title: 'Editorials',
          editorials: editorial,
          categories: categoryArray,
          authors: author,
          hasEditorials: editorial.length > 0,
          hasCategories: categoryArray.length > 0,
          hasAuthors: author.length > 0,
          editMode: false,
        });
      });
    });
  });
};

exports.PostAddEditorial = (req, res, next) => {
  const name = req.body.Name;
  const country = req.body.Country;
  const phone = req.body.Phone;
  const image = req.file;

  function Validate() {
    isValid = true;
    if (name == null || name == undefined || name == '') {
      isValid = false;
    }
    if (country == null || country == undefined || country == '') {
      isValid = false;
    }
    if (phone == null || phone == undefined || phone == '') {
      isValid = false;
    }

    return isValid;
  }

  if (!image) {
    res.redirect('/admin/editorials');
  }

  if (Validate()) {
    Editorial.create({
      Name: name,
      Country: country,
      Phone: phone,
      Image: `/${image.filename}`,
    }).then(() => {
      res.redirect('/admin/editorials');
    });
  }
};

exports.GetEditEditorial = (req, res, next) => {
  const editMode = req.query.edit;

  Category.findAll().then((categories) => {
    const categoryArray = categories.map((category) => category.dataValues);

    Author.findAll().then((authors) => {
      const author = authors.map((author) => author.dataValues);
      if (!editMode) {
        return res.redirect('/admin/editorials');
      }

      Editorial.findOne({ where: { id: req.params.EditorialID } }).then(
        (editorial) => {
          const editorialData = editorial.dataValues;
          res.render('admin/Editorial/editEditorial', {
            title: 'Editorials',
            editMode: editMode,
            editorial: editorialData,
            categories: categoryArray,
            authors: author,
            hasCategories: categoryArray.length > 0,
            hasAuthors: author.length > 0,
            hasEditorials: editorialData.length > 0,
          });
        }
      );
    });
  });
};

exports.PostEditEditorial = (req, res, next) => {
  const id = req.body.EditorialId;
  const name = req.body.Name;
  const country = req.body.Country;
  const phone = req.body.Phone;
  const imagePath = req.file;

  Editorial.findOne({ where: { id: id } }).then((editorial) => {
    const editorialData = editorial.dataValues;

    if (!editorialData) {
      res.redirect('/admin/editorials');
    }

    const image = imagePath ? '/' + imagePath.filename : editorialData.Image;
    Editorial.update(
      { Name: name, Country: country, Phone: phone, Image: image },
      { where: { id: id } }
    ).then(() => {
      res.redirect('/admin/editorials');
    });
  });
};

exports.PostDeleteEditorial = (req, res, next) => {
  Editorial.destroy({ where: { id: req.body.EditorialId } }).then(() => {
    res.redirect('/admin/editorials');
  });
};
