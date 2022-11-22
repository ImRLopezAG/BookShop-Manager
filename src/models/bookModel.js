const Sequelize = require('sequelize');

const sequelize = require('../server/database.js').sequelize;

const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Editorial: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Pages: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;
