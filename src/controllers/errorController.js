exports.Get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
};

exports.GetNotFound = (req, res, next) => {
  res.render('admin/notfound', { pageTitle: 'Item Not Found' });
};
