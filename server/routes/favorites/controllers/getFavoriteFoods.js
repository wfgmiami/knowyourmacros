const { User } = require('../../../db');

const addFavoriteFood = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.user_id);
    const abbrevs = await user.getAbbrevs();
    res.json(abbrevs);
  } catch (err) {
    next(err);
  }
};

module.exports = addFavoriteFood;
