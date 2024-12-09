const { FoodRecord } = require('../../../db');

/**
 * Add a food record
 * {@link http://localhost:3000/api-docs/#/food-record/postapi_food_record}
 */
const addFoodRecord = async (req, res, next) => {
  try {
    // const foods = [];
    // for (obj of req.body) {
    //   const food = await FoodRecord.createWithMeal(Object.assign(req.body, { user_id: res.locals.user_id }));
    //   foods.push(food);
    // }

    const foods = await Promise.all(req.body.map((body) => FoodRecord.createWithMeal(Object.assign(body, { user_id: res.locals.user_id }))));
    res.status(201).json(foods);
  } catch (err) {
    next(err);
  }
};

module.exports = addFoodRecord;
