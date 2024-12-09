const sequelize = require('../../conn');
const normalized = require('./getterMethods/normalized');

const { Sequelize } = sequelize;

module.exports = sequelize.define('weight', {
  Seq: {
    type: Sequelize.INTEGER
  },
  Amount: {
    type: Sequelize.DECIMAL
  },
  Description: {
    type: Sequelize.STRING
  },
  Gr_Wgt: {
    type: Sequelize.DECIMAL
  }
}, {
  getterMethods: {
    normalized
  }
});

