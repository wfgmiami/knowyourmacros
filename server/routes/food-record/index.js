const router = require('express').Router();
const addFoodRecord = require('./controllers/addFoodRecord');
const deleteFoodRecord = require('./controllers/deleteFoodRecord');
const getFoodRecordsByDate = require('./controllers/getFoodRecordsByDate');
const getFoodRecordMicro = require('./controllers/getFoodRecordMicro');
const makeMealPublic = require('./controllers/makeMealPublic');
const updateQuantity = require('./controllers/updateQuantity');
const updateRecordStatus = require('./controllers/updateRecordStatus');

router.post('/', addFoodRecord);
router.delete('/', deleteFoodRecord);
router.get('/:date', getFoodRecordsByDate);
router.get('/micro/:date', getFoodRecordMicro);
router.put('/meal', makeMealPublic);
router.put('/quantity/:id', updateQuantity);
router.put('/', updateRecordStatus);

module.exports = router;
