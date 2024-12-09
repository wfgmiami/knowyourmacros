/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

const sequelize = require('../../conn');
const Weight = require('../weight');
const AbbrevMicro = require('../abbrev-micro');
const FoodDesc = require('../food-des');

const classMethods = require('./classMethods');
const getterMethods = require('./getterMethods');

const { Sequelize } = sequelize;
const macroType = () => ({
  type: Sequelize.DECIMAL,
  allowNull: false,
  validate: {
    min: 0
  }
});

const titleType = () => ({
  type: Sequelize.TEXT,
  allowNull: false
});

/**
 * define the database model, abbrev
 * @see foodDesTypes
 */
module.exports = sequelize.define('abbrev', {
  Main: titleType(),
  Sub: titleType(),
  Calories: macroType(),
  Protein: macroType(),
  Fat: macroType(),
  Carbohydrates: macroType(),
  GmWt_1: {
    type: Sequelize.DECIMAL
  },
  GmWt_Desc1: {
    type: Sequelize.STRING
  },
  GmWt_2: {
    type: Sequelize.DECIMAL
  },
  GmWt_Desc2: {
    type: Sequelize.STRING
  },
  UserID: {
    type: Sequelize.INTEGER
  }
}, {
  defaultScope: {
    include: [
      Weight,
      // AbbrevMicro,
      FoodDesc
    ]
  },
  getterMethods,
  scopes: {
    weight: {
      include: [Weight]
    },
    foodGroup: {
      include: [FoodDesc.scope('foodGroup')]
    },
    micro: {
      include: [AbbrevMicro]
    },
    all: {
      include: [
        Weight,
        AbbrevMicro,
        FoodDesc
      ]
    }
  },
  /* eslint-disable */
  hooks: {
    /**
     * @param {objType} abbrevs 
     * @param {*} options 
     */
    beforeBulkCreate(abbrevs, options) {
      abbrevs.forEach((abbrev) => {
        if (abbrev.GmWt_Desc1 && abbrev.GmWt_Desc1.charAt(0) === '.') {
          abbrev.GmWt_Desc1 = `0${abbrev.GmWt_Desc1}`;
        }
        if (abbrev.GmWt_Desc2 && abbrev.GmWt_Desc2.charAt(0) === '.') {
          abbrev.GmWt_Desc2 = `0${abbrev.GmWt_Desc2}`;
        }
        if (abbrev.UserID) {
          abbrev.user_id = abbrev.UserID;
        }
        if (abbrev.user_id === '0') {
          abbrev.user_id = null;
        }
      });
    }
  },
  /* eslint-enable */
  classMethods
});
