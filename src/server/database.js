const Sequelize = require('sequelize');

exports.sequelize = new Sequelize('BookShopManager', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});
