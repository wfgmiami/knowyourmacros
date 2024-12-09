const sequelize = require('../../conn');

const { Sequelize } = sequelize;

const md5 = require('crypto-md5');

const UserMeasurement = require('../user-measurements');
const MealGoals = require('../meal-goals');
const Meal = require('../meal');
const Program = require('../program');
const Abbrev = require('../abbrev');

const classMethods = require('./classMethods');

const stringType = () => ({
  type: Sequelize.STRING,
});

const User = sequelize.define('user', {
  firstname: stringType(),
  lastname: stringType(),
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.TEXT,
    validate: {
      isEmail: true
    }
  },
  password: stringType(),
  birthdate: {
    type: Sequelize.DATEONLY
  },
  googleId: stringType(),
  fitbitId: stringType(),
  fitbitToken: stringType(),
  fitbitRefreshToken: stringType()
}, {
  defaultScope: {
    include: [
      // Abbrev,
      {
        model: UserMeasurement,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      },
      {
        model: MealGoals,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      },
      {
        model: Program,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      }
    ]
  },
  scopes: {
    abbrev: {
      include: [Abbrev]
    },
    measurements: {
      include: [{
        model: UserMeasurement,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      }]
    },
    'meal-goals': {
      include: [{
        model: MealGoals,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      }]
    },
    programs: {
      include: [{
        model: Program,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      }]
    },
    meals: {
      include: [
        Meal.scope('records')
      ]
    }
  },
  hooks: {
    /* eslint-disable */
    beforeCreate(user) {
      user.password = md5(user.password, 'hex');
      return user;
    },
    beforeBulkCreate(users) {
      users = users.map((user) => {
        user.password = md5(user.password, 'hex');
        return user;
      });
      return users;
    }
    /* eslint-enable */
  },
  classMethods
});

module.exports = User;
