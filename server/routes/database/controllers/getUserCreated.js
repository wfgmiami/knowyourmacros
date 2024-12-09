const { Abbrev } = require('../../../db');

const getUserCreated = async (req, res, next) => {
  try {
    const { user_id } = res.locals;
    const abbrevs = await Abbrev.findAll({
      where: { UserID: user_id },
      order: ['Main', 'Sub']
    });
    res.json(abbrevs);
  } catch (err) {
    next(err);
  }
};

module.exports = getUserCreated;
