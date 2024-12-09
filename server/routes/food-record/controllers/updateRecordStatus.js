const { FoodRecord } = require('../../../db');

const updateRecordStatus = async (req, res, next) => {
  try {
    const records = await Promise.all(req.body.ids.map((id) => FoodRecord.findById(id)));
    await Promise.all(records.map((record) => {
      record.confirmed = req.body.status; // eslint-disable-line
      return record.save();
    }));
    const savedRecords = await Promise.all(req.body.ids.map((id) => FoodRecord.findById(id)));
    res.json(savedRecords.map((record) => record.calMacros()));
  } catch (err) {
    next(err);
  }

  // try {
  //   const record = await FoodRecord.findById(req.params.recordId);
  //   record.confirmed = req.params.status;
  //   await record.save();
  //   const savedRecord = await FoodRecord.findById(record.id);
  //   res.json(savedRecord.calMacros());
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = updateRecordStatus;
