const router = require('express').Router();
const singleMealCalculate = require('./controllers/singleMealCalculate');
const dayMealsCalculate = require('./controllers/dayMealsCalculate');

module.exports = router;

router.get('/', singleMealCalculate);
router.post('/day', dayMealsCalculate);
