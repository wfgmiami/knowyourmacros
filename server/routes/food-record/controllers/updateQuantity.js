const { FoodRecord } = require('../../../db');

const updateQuantity = async (req, res, next) => {
  try {
    const record = await FoodRecord.findById(req.params.id);
    await record.updateQuantity(req.body);
    const newRecord = await FoodRecord.findById(req.params.id);
    res.json(newRecord.calMacros());
  } catch (err) {
    next(err);
  }
};

module.exports = updateQuantity;
