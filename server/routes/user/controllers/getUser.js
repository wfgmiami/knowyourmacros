const { User } = require('../../../db');

const getUser = async (req, res, next) => {
  try {
    const user = await User.scope('measurements', 'meal-goals', 'programs').findById(res.locals.user_id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
