const { UserMeasurement } = require('../../../db');

const deleteMeasurements = async (req, res, next) => {
  try {
    const measurement = await UserMeasurement.findOne({
      where: {
        id: req.body.id,
        user_id: res.locals.user_id
      }
    });
    if (measurement) {
      await measurement.destroy();
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteMeasurements;
