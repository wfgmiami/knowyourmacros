const db = require(`../../server/db`);

db.seed = () => db.sequelize.sync({ force: true })
  .then(() => db.Abbrev.bulkCreate(require('./data/abbrev')))
  .then(() => db.AbbrevMicro.bulkCreate(require('./data/abbrev-micro')))
  .then(() => db.FoodGroup.bulkCreate(require('./data/fd-group')))
  .then(() => db.FoodDesc.bulkCreate(require('./data/food-des')))
  .then(() => db.Weight.bulkCreate(require('./data/weight')))
  .catch(err => console.log(err));

module.exports = db;

