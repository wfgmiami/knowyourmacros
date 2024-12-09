const router = require('express').Router();
const app = require('../');
const jwt = require('jwt-simple');
const { User } = require('../db');

router.use(async (req, res, next) => {
  try {
    res.locals = {
      jwtSecret: app.get('jwtSecret')
    };

    if (req.path === '/user/signup' || req.path === '/session') {
      next();
      return;
    }

    const { token } = req.headers;
    if (!token || token === '[object Object]') {
      console.log('No token or Invalid token');
      console.log(req.path);
      res.sendStatus(401);
    } else {
      const user_id = jwt.decode(token, app.get('jwtSecret')).id || jwt.decode(token, app.get('jwtSecret')).token;
      const user = await User.findById(user_id);
      if (!user) {
        console.log('No user');
        res.sendStatus(401);
      } else {
        Object.assign(res.locals, { user_id });
        console.log(req.path);
        next();
      }
    }
  } catch (err) {
    res.sendStatus(401);
  }
});

router.use((req, res, next) => {
  // if (process.env.NODE_ENV === 'development') {
  //   setTimeout(() => {
  //     next();
  //   }, 2000);
  // } else {
  next();
  // }
});

[
  'calculate',
  'database',
  'favorites',
  'fitbit',
  'food',
  'foodmicro',
  'food-record',
  'generate',
  'goals',
  'meal',
  'programs',
  'session',
  'shopping-list',
  'user',
].forEach(pth => router.use(`/${pth}`, require(`./${pth}`))); // eslint-disable-line


module.exports = router;
