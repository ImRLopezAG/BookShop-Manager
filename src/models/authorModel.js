const Sequelize = require('sequelize');

const sequelize = require('../server/database.js').sequelize;

const Author = sequelize.define('author', {
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
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Author;