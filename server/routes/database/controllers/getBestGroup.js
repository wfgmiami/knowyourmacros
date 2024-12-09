const { FoodDesc } = require('../../../db');

const getBestGroup = async (req, res) => {
  try {
    const { food } = req.query;
    const group = await FoodDesc.getBestGroup(food[0]);
    res.json(group);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = getBestGroup;
