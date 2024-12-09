const moment = require('moment');
const jwt = require('jwt-simple');
const { sequelize, User, UserMeasurement, Program } = require('../../../db');
// const createMeasurements = require('./createMeasurements');

const signup = async (req, res, next) => {
  try {
    const data = req.body;
    const params = ['gender', 'height', 'weight', 'units', 'lifestyle', 'goal'];
    const hasMeasurements = params.reduce((memo, param) => memo && data[param], true);
    if (hasMeasurements) {
      const programObj = Program.makeProgramObject(req.body);
      delete programObj.user_id;

      const transaction = await sequelize.transaction();

      // Create the user
      const user = await User.create(req.body, { transaction });
      const age = moment().diff(data.birthdate, 'years');

      // Create the measurements
      const measurement = await UserMeasurement.create({ ...data, age }, { transaction });

      // Create the program
      const program = await Program.create(programObj, { transaction });

      // Associate measurements and program
      await user.addUserMeasurement(measurement, { transaction });
      await user.addProgram(program, { transaction });

      await transaction.commit();

      // Get the user with measurements, goals, and programs
      const userFull = await User.scope('measurements', 'meal-goals', 'programs').findById(user.id);

      const token = jwt.encode({
        id: user.id
      }, res.locals.jwtSecret);

      res.set({ token }).json(userFull);
    } else {
      const user = await User.create(req.body);
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = signup;
