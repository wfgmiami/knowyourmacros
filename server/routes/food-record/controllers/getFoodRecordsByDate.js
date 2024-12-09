const assert = require('assert');
const { FoodRecord } = require('../../../db');

/**
 * {@link http://localhost:3000/api-docs/#/food-record/get_api_food_record__date_}
 */
const getFoodRecordsByDate = async (req, res, next) => {
  try {
    assert(!!res.locals.user_id, 'The user_id must be specified');
    const records = await FoodRecord.findByDate(req.params.date, res.locals.user_id);
    res.json(records.map(record => record.calMacros()));
  } catch (err) {
    next(err);
  }
};

module.exports = getFoodRecordsByDate;
