function makeFoodQuery(food) {
  if (food.length === 1 && food[0] === '') {
    return {};
  }
  return {
    $and: food.map(fd => ({
      $or: [{
        Main: { $iLike: `%${fd}%` }
      }, {
        Sub: { $iLike: `%${fd}%` }
      }],
    }))
  };
}

module.exports = makeFoodQuery;
