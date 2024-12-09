const uuidv1 = require('uuid/v1');
const { Abbrev } = require('../../../db');

const dayMealsCalculation = async (req, res, next) => {
  try {
    const output = await Abbrev.dayCalculation(res.locals.user_id, req.body.type);

    const toSend = {};
    toSend.foods = output;
    toSend.type = req.query.type;
    toSend.isConfirmed = false;
    toSend.uuid = req.body.uuid || uuidv1();

    res.json(toSend);
  } catch (err) {
    next(err);
  }
};

module.exports = dayMealsCalculation;
