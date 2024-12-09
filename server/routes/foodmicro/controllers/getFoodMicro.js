const { Abbrev } = require('../../../db');

const getFoodMicro = async (req, res, next) => {
  try {
    const food = await Abbrev.scope('all').findById(req.params.id);
    res.json(food);
  } catch (err) {
    next(err);
  }
};

module.exports = getFoodMicro;
