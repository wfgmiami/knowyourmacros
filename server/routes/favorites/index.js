const router = require('express').Router();
const addFavoriteFood = require('./controllers/addFavoriteFood');
const removeFavoriteFood = require('./controllers/removeFavoriteFood');
const getFavoriteFoods = require('./controllers/getFavoriteFoods');

module.exports = router;

router.get('/food', getFavoriteFoods);
router.post('/food', addFavoriteFood);
router.delete('/food', removeFavoriteFood);
