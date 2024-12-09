const { Abbrev, FoodDesc, Weight } = require('../../../db');

const getFoodByName = async (req, res, next) => {
  try {
    const food = req.params.foodname.split(' ');
    const offset = parseInt(req.query.offset, 10) || 0;
    const where = makeWhere(food);

    const count = await Abbrev.scope().count({ where });
    const rows = await Abbrev.findAll({
      limit: 50,
      offset: offset * 50,
      where,
      order: ['Main'],
      include: [FoodDesc, Weight]
    });

    res.json({
      count,
      rows,
      query: req.params.foodname,
      offset: offset || 0
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getFoodByName;

function makeWhere(food) {
  return {
    $and: food.map((fd) => ({
      $or: [{
        Main: {
          $iLike: `%${fd}%`
        }
      },
      {
        Sub: {
          $iLike: `%${fd}%`
        }
      }
      ],
    }))
  }
}
