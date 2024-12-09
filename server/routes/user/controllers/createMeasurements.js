const { UserMeasurement } = require('../../../db');

const createMeasurements = async (body, user_id) => {
  /** Existing record */
  const currentDayMeas = await UserMeasurement.find({
    where: {
      createdAt: {
        $between: [new Date(new Date(body.createdAt).setHours(0, 0, 0, 0)), new Date(new Date(body.createdAt) + 100)]
      },
      user_id
    }
  });

  // If there's an existing record, update it instead of creating a new one
  if (currentDayMeas) {
    Object.keys(body).forEach((key) => { currentDayMeas[key] = body[key]; });
    await currentDayMeas.save();
  } else {
    await UserMeasurement.create(Object.assign(body, { user_id }));
  }

  const allMeasurements = await UserMeasurement.findAllByUserId(user_id);
  return allMeasurements;
};

module.exports = createMeasurements;
