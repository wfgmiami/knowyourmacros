const { MealGoals, User } = require('../../../db');

const createGoals = async (req, res, next) => {
  try {
    await MealGoals.create({
      goals: req.body,
      user_id: res.locals.user_id
    });
    // res.json(meal);
    const user = await User.scope('measurements', 'meal-goals', 'programs').findById(res.locals.user_id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = createGoals;
