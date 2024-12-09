const { User } = require('../../../db');

const addFavoriteFood = async (req, res, next) => {
  try {
    const { abbrevId, meal } = req.body;
    const data = await User.addFavoriteFood(res.locals.user_id, abbrevId, meal);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = addFavoriteFood;
