const { Abbrev } = require('../../../db');

const singleMealCalculate = async (req, res, next) => {
  try {
    const { proteinGoal, carbGoal, fatGoal, id } = req.query;
    const output = await Abbrev.calculateMacros({ proteinGoal, carbGoal, fatGoal }, id);
    res.json(output);
  } catch (err) {
    next(err);
  }
};

module.exports = singleMealCalculate;
