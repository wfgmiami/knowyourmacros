const router = require('express').Router();
const getUser = require('./controllers/getUser');
const signup = require('./controllers/signup');
const createMeasurements = require('./controllers/createMeasurements');
const deleteMeasurements = require('./controllers/deleteMeasurements');
const updateUser = require('./controllers/updateUser');

module.exports = router;

router.get('/', getUser);
router.put('/', updateUser);
router.post('/signup', signup);

router.post('/measurements', async (req, res, next) => {
  try {
    const measurements = await createMeasurements(req.body, res.locals.user_id);
    res.json(measurements);
  } catch (err) {
    next(err);
  }
});

router.delete('/measurements', deleteMeasurements);

// db.User.requestFoodLog(3, '2017-10-04')
//   .then(({data}) => console.log(data));

