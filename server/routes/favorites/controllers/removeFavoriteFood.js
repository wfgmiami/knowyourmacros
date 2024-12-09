const { User } = require('../../../db');

const removeFavoriteFood = async (req, res, next) => {
  try {
    const { abbrevId, meal } = req.body;

    await User.removeFavoriteFood(res.locals.user_id, abbrevId, meal);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = removeFavoriteFood;
