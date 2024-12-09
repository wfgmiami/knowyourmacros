const { User } = require('../../../db');

const getCalories = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    try {
      const { data } = await User.requestCalories(res.locals.user_id, startDate, endDate);
      res.json(data['activities-calories']);
    } catch (err) {
      const user = await User.findOne({ where: { id: res.locals.user_id } });

      /** If there's an error, it's because the token was expired, so get a new one */
      const result = await User.exRefreshToken(user.fitbitRefreshToken, res.locals.user_id);
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getCalories;
