const Category = require('../../models/categoryModel');
const Author = require('../../models/authorModel');
const Editorial = require('../../models/editorialModel');

exports.GetAdminCategories = (req, res, next) => {
  Editorial.findAll().then((editorials) => {
    const editorialArray = editorials.map((editorial) => {
      return editorial.dataValues;
    });
    Author.findAll().then((authors) => {
      const authorsArray = authors.map((author) => {
        return author.dataValues;
      });
      Category.findAll().then((categories) => {
        const categoriesArray = categories.map((category) => {
          return category.dataValues;
        });
        res.render('admin/Categories/admin', {
          title: 'Categories',
          categories: categoriesArray,
          authors: authorsArray,
          editorials: editorialArray,
          hasCategories: categoriesArray.length > 0,
        });
      });
    });
  });
};

exports.GetAddCategory = (req, res, next) => {
  res.render('admin/Categories/editCategory', {
    title: 'Categories',
    editMode: false,
  });
};

exports.PostAddCategory = (req, res, next) => {
  const name = req.body.Name;
  const description = req.body.Description;
  const image = req.file;

  function Validate() {
    isValid = true;
    if (name == null || name == undefined || name == '') {
      isValid = false;
    }
    if (description == null || description == undefined || description == '') {
      isValid = false;
    }

    return isValid;
  }

  if (!image) {
    res.redirect('/admin/categories');
  }

  if (Validate()) {
    Category.create({
      Name: name,
      Description: description,
      Image: `/${image.filename}`,
    }).then(() => {
      res.redirect('/admin/categories');
    });
  }
};

exports.GetEditCategory = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.CategoryId;

  Editorial.findAll().then((editorials) => {
    const editorialArray = editorials.map((editorial) => {
      return editorial.dataValues;
    });
    Author.findAll().then((authors) => {
      const authorsArray = authors.map((author) => {
        return author.dataValues;
      });
      Category.findByPk(id).then((category) => {
        if (!category) {
          res.redirect('/admin/categories');
        }
        res.render('admin/Categories/editCategory', {
          title: 'Category',
          categories: category,
          authors: authorsArray,
          editorials: editorialArray,
          editMode: editMode,
        });
      });
    });
  });
};

exports.PostEditCategory = (req, res, next) => {
  const id = req.body.CategoryId;

  const name = req.body.Name;
  const description = req.body.Description;
  const imagePath = req.file;

  Category.findOne({ where: { id: id } }).then((category) => {
    const categoryData = category.dataValues;

    if (!categoryData) {
      res.redirect('/admin/categories');
    }
    const image = imagePath ? '/' + imagePath.filename : categoryData.Image;

    Category.update(
      {
        Name: name,
        Description: description,
        Image: image,
      },
      { where: { id: id } }
    ).then(() => {
      res.redirect('/admin/categories');
    });
  });
};

exports.PostDeleteCategory = (req, res, next) => {
  const categoryId = req.body.CategoryId;
  Category.destroy({ where: { id: categoryId } }).then(() => {
    console.log(`Category with id ${categoryId} deleted`);
    res.redirect('/admin/categories');
  });
};
