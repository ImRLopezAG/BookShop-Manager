const Category = require('../../models/categoryModel');

exports.GetAdminCategories = (req, res, next) => {
  Category.findAll().then((categories) => {
    const categoriesArray = categories.map((category) => {
      return category.dataValues;
    });
    res.render('admin/Categories/admin', {
      title: 'Categories',
      categories: categoriesArray,
      hasCategories: categoriesArray.length > 0,
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
  let created = req.body.CategoryCreate;

  const name = req.body.Name;
  const description = req.body.Description;

  function Validate() {
    isValid = true;
    if (name == '' || name == null || name == undefined) {
      isValid = false;
    }
    if (description == '' || description == null || description == undefined) {
      isValid = false;
    }

    return isValid;
  }

  if (Validate()) {
    Category.create({ Name: name, Description: description }).then(() => {
      res.redirect('/admin/categories');
    });
  } else {
    created = '';
  }
};

exports.GetEditCategory = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/admin/categories');
  }

  Category.findOne({ where: { id: req.params.CategoryID } }).then(
    (category) => {
      const categoryData = category.dataValues;

      res.render('admin/Categories/editCategory', {
        categoryData: categoryData,
        editMode: editMode,
        title: 'Categories',
      });
    }
  );
};

exports.PostEditCategory = (req, res, next) => {
  const id = req.body.id;

  const name = req.body.Name;
  const description = req.body.Description;

  Category.update(
    { Name: name, Description: description },
    { where: { id: id } }
  ).then(() => {
    res.redirect('/admin/categories');
  });
};

exports.PostDeleteCategory = (req, res, next) => {
  const categoryId = req.body.CategoryId;
  Category.destroy({ where: { id: categoryId  } }).then(() => {
    console.log(`Category with id ${categoryId} deleted`);
    res.redirect('/admin/categories');
  });
};
