const sequelize = require('../../conn');
const FoodRecord = require('../food-record');
const findByDate = require('./classMethods/findByDate');

const { Sequelize } = sequelize;

const Meal = sequelize.define('meal', {
  date: {
    type: Sequelize.DATEONLY
  },
  meal: {
    type: Sequelize.INTEGER
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  postWorkout: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  scopes: {
    records: {
      include: [FoodRecord]
    }
  },
  classMethods: {
    findByDate
  }
});

module.exports = Meal;
