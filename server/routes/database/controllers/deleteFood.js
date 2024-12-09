const { Abbrev } = require('../../../db');

const deleteFood = async (req, res, next) => {
  try {
    const abbrev = await Abbrev.findById(req.body.id);
    await abbrev.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteFood;
