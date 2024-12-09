const { Abbrev } = require('../../../../db');
const makeFoodQuery = require('./queries/food');
const makePercentQuery = require('./queries/percent');

const searchDetail = async (req, res, next) => {
  try {
    const where = Object.assign({},
      makeFoodQuery(req.body.searchVal.split(' ')),
      makePercentQuery(req.body)
    );

    const count = await Abbrev.scope().count({ where });
    const rows = await Abbrev.findAll({ where });
    res.json({
      count,
      rows,
      query: req.body.searchVal,
      offset: 0
    });
  } catch (err) {
    next(err);
  }
};


module.exports = searchDetail;
