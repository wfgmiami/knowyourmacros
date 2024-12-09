const router = require('express').Router();
const db = require('../../db');
const getBestGroup = require('./controllers/getBestGroup');
const getUserCreated = require('./controllers/getUserCreated');
const deleteFood = require('./controllers/deleteFood');
const searchDetail = require('./controllers/searchDetail');

module.exports = router;

router.get('/foodgroup', getBestGroup);
router.get('/user-created', getUserCreated);
router.post('/search-detail', searchDetail);
router.delete('/user-created', deleteFood);
