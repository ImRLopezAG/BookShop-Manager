const Editorial = require('../../models/editorialModel');

exports.GetAdminEditorials = (req, res, next) => {
  Editorial.findAll().then((editorials) => {
    const editorialArray = editorials.map((editorial) => {
      return editorial.dataValues;
    });
    res.render('admin/Editorial/admin', {
      title: 'Admin Editorials',
      editorials: editorialArray,
      hasEditorials: editorialArray.length > 0,
    });
  });
};

exports.GetAddEditorial = (req, res, next) => {
  res.render('admin/Editorial/editEditorial', {
    title: 'Editorials',
    editMode: false,
  });
};

exports.PostAddEditorial = (req, res, next) => {
  let created = req.body.EditorialCreate;

  const name = req.body.Name;
  const country = req.body.Country;
  const phone = req.body.Phone;

  console.log(name, country, phone);

  function Validate() {
    IsValid = true;
    if (name == '' || name == null || name == undefined) {
      IsValid = false;
    }
    if (country == '' || country == null || country == undefined) {
      IsValid = false;
    }
    if (phone == '' || phone == null || phone == undefined) {
      IsValid = false;
    }

    return IsValid;
  }

  if (Validate()) {
    Editorial.create({ Name: name, Country: country  , Phone :phone}).then(() => {
      res.redirect('/admin/editorials');
    });
  } else {
    created = '';
  }
};

exports.GetEditEditorial = (req, res, next) => {
  const editMode = req.query.edit;

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
      });
    }
  );
};

exports.PostEditEditorial = (req, res, next) => {
  const id = req.body.EditorialId;
  const name = req.body.Name;
  const country = req.body.Country;
  const phone = req.body.Phone;

  Editorial.update(
    { Name: name, Country: country, Phone: phone },
    { where: { id: id } }
  ).then(() => {
    res.redirect('/admin/editorials');
  });
};

exports.PostDeleteEditorial = (req, res, next) => {
  Editorial.destroy({ where: { id: req.body.EditorialId } }).then(() => {
    res.redirect('/admin/editorials');
  });
};
