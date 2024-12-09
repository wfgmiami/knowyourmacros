const { FoodRecord } = require('../../../db');

const getList = async (req, res, next) => {
  try {
    const records = await FoodRecord.findAll({
      where: {
        Date: {
          $gte: new Date(req.query.date),
          $lte: new Date(new Date(req.query.date).getTime() + (86400000 * 6))
        },
        user_id: res.locals.user_id
      }
    });
    res.json(records.map(record => record.calMacros()));
  } catch (err) {
    next(err);
  }
};

module.exports = getList;
