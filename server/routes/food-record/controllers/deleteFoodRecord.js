const assert = require('assert');
const { Meal, FoodRecord } = require('../../../db');
const ApiError = require('../../../configure/appError');


/**
 * Delete a food record
 * {@link http://localhost:3000/api-docs/#/food-record/deleteapi_food_record}
 */
const deleteFoodRecord = async (req, res, next) => {
  try {
    assert(req.body, 'No request body');

    const { ids } = req.body;
    const records = await Promise.all(ids.map((id) => FoodRecord.findById(id, { include: [Meal] })));
    const { meal } = records[0];
    await Promise.all(records.map((record) => record.destroy()));
    // const foodrecord = await FoodRecord.findById(req.body.id, { include: [Meal] });
    // if (!foodrecord) {
    //   throw new ApiError(404, 'Record not found', true);
    // }
    // const meal = foodrecord.meal;
    // await foodrecord.destroy(null);
    const storedMeal = await Meal.findById(meal.id);
    if (storedMeal) {
      storedMeal.public = false;
      await storedMeal.save();
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteFoodRecord;
