const Sequelize = require('sequelize');

const sequelize = require('../server/database.js').sequelize;

const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
