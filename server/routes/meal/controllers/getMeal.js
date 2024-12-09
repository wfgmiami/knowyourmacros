const { Meal, FoodRecord, Abbrev } = require('../../../db');

const getFoodMicro = async (req, res, next) => {
  try {
    const where = makeWhere(req.body.meals, req.query.postWorkout, req.query.keyword, res.locals.user_id);
    const inclWhere = makeInclWhere(req.query.keyword);
    const meals = await Meal.findAll({
      where,
      include: [{
        model: FoodRecord,
        include: [{ model: Abbrev, where: inclWhere }]
      }],
      order: [['id', 'DESC']],
      limit: 15
    });

    const indMeals = await Meal.findAll({
      where: { $or: meals.map(meal => ({ id: meal.id })) },
      include: [{ model: FoodRecord, include: [Abbrev] }]
    });

    res.json(indMeals);
  } catch (err) {
    next(err);
  }
};

module.exports = getFoodMicro;

/**
 * Build where query object
 * @param {Array<number>} meals
 * @param {boolean} postWorkout
 * @param {number} user_id
 */
function makeWhere(meals, postWorkout, user_id) {
  const where = {
    user_id: {
      $ne: user_id
    },
    public: true
  };
  if (meals) {
    Object.assign(where, {
      meal: { $or: meals }
    });
  }
  if (postWorkout === 'true') {
    Object.assign(where, { postWorkout: true });
  }
  return where;
}

/**
 * Make include where object
 * @param {string} keyword
 */
function makeInclWhere(keyword) {
  const inclWhere = {};
  if (keyword) {
    Object.assign(inclWhere, {
      $and: keyword.split(' ').map(fd => ({
        $or: [{
          Main: { $iLike: `%${fd}%` }
        }, {
          Sub: { $iLike: `%${fd}%` }
        }]
      }))
    });
  }
  return inclWhere;
}
