const sequelize = require('../../conn');

const { Sequelize } = sequelize;

module.exports = sequelize.define('recordFavorite', {
  meal: {
    type: Sequelize.INTEGER
  }
});

