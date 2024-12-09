const { User } = require('../../../db');

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.user_id);
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = updateUser;
