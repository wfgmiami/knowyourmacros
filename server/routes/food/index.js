const router = require('express').Router();
const getFoodByName = require('./controllers/getFoodByName');
const createFood = require('./controllers/createFood');
const db = require('../../db');

router.get('/:foodname', getFoodByName);
router.post('/', createFood);


module.exports = router;
