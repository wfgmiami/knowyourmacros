const router = require('express').Router();
const User = require('../../db/models/user');
const jwt = require('jwt-simple');
const getUserFromToken = require('./controllers/getUserFromToken');

module.exports = router;

router.use((req, res, next) => {
  res.locals = {
    jwtSecret: process.env.SECRET || '1701-Flex-NY'
  };
  next();
});

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByPassword({ username, password });
    if (user) {
      res.send({
        token: jwt.encode({
          id: user.id
        }, res.locals.jwtSecret)
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:token', getUserFromToken);
