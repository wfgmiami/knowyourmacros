// const fs = require('fs');

// const pathToData = fileName => `../../../server/db/data/${fileName}`;

const abbrev = require('./abbrev');
const abbrevMicro = require('./abbrev-micro');
const foodDes = require('./food-des');
const foodGroup = require('./fd-group');
const weight = require('./weight');

// [
//   'abbrev-micro',
//   'food-des',
//   'weight'
// ].forEach(dt => {
//   const raw = require(pathToData(dt));
//   const data = JSON.stringify(raw.filter(item => abbrev.reduce((memo, food) => {
//     return memo || item.abbrev_id === food.id;
//   }, false)));
//   fs.writeFile(`./${dt}.json`, data, function (err) {
//     if (err) return console.log(err);
//     console.log(dt);
//   });
// });


module.exports = {
  abbrev,
  abbrevMicro,
  foodDes,
  foodGroup,
  weight
};

