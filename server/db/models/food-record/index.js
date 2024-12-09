const sequelize = require('../../conn');
const Abbrev = require('../abbrev');

const { Sequelize } = sequelize;

const { calMacros, updateQuantity } = require('./instanceMethods');
const classMethods = require('./classMethods');

module.exports = sequelize.define('foodRecord', {
  Date: {
    type: Sequelize.DATEONLY,
  },
  Meal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  Quantity: {
    type: Sequelize.DECIMAL,
  },
  Unit: {
    type: Sequelize.INTEGER
  },
  fromProgram: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  defaultScope: {
    include: [
      Abbrev,
    ]
  },
  scopes: {
    micro: {
      include: [
        Abbrev.scope('micro', 'weight')
      ]
    }
  },
  instanceMethods: {
    calMacros,
    updateQuantity
  },
  classMethods
});
