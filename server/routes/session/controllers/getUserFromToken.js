const jwt = require('jwt-simple');
const { User } = require('../../../db');

const getUserFromToken = async (req, res, next) => {
  try {
    const token = jwt.decode(req.params.token, res.locals.jwtSecret);
    const user = await User.findById(token.id || token.token);
    if (!user) {
      res.sendStatus(401);
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getUserFromToken;
