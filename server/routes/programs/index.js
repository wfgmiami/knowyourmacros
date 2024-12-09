const router = require('express').Router();
const getProgram = require('./controllers/getProgram');
const createProgram = require('./controllers/createProgram');

module.exports = router;

router.get('/', getProgram);
router.post('/', createProgram);
