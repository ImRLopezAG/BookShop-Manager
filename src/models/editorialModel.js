const Sequelize = require('sequelize');

const sequelize = require('../server/database.js').sequelize;

const Editorial = sequelize.define('editorial', {
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
  Country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Editorial;
