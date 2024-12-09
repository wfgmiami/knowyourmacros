const db = require('../../../db');

const createFood = (req, res, next) => {
  const { main, sub, calories, protein, carbohydrates, fat, servingDescription, servingWeight, servingSize, group } = req.body;
  db.sequelize.transaction(creation => Promise
    .all([
      db.Abbrev
      .create({
        Main: main,
        Sub: sub,
        Calories: convertToPer100(calories, servingWeight),
        Protein: convertToPer100(protein, servingWeight),
        Fat: convertToPer100(fat, servingWeight),
        Carbohydrates: convertToPer100(carbohydrates, servingWeight),
        GmWt_1: servingWeight,
        GmWt_Desc1: `${servingSize} ${servingDescription}`,
        UserID: res.locals.user_id
      }, {
        transaction: creation
      }),
      db.Weight
      .create({
        Seq: 1,
        Amount: servingSize,
        Description: servingDescription,
        Gr_Wgt: servingWeight
      }, {
        transaction: creation
      })  
    ])
    .then(([newAbbrev, newWeight]) => Promise.all([
      newAbbrev.addWeight(newWeight, { transaction: creation }),
      db.FoodDesc
      .create({
        FdGrp_Cd: group.group,
        Long_Desc: `${main}, ${sub}`,
        Short_Desc: `${main},${sub}`.toUpperCase(),
      }, {
        transaction: creation
      })
    ]))
    .then(([abbrev, newDesc]) => Promise.all([
      abbrev.setFoodDesc(newDesc, { transaction: creation }),
      db.AbbrevMicro.create({}, { transaction: creation }),
      abbrev
    ]))
    .then(([foodDesc, abbrevMicro, abbrev]) => {
      console.log(abbrev);
      return abbrev.setAbbrevMicro(abbrevMicro, { transaction: creation })
    })
    .then(() => res.sendStatus(201))
    .catch(next)
  );
};
  
function convertToPer100(macroWeight, servingWeight) {
  return Math.round((parseFloat(macroWeight) / parseFloat(servingWeight)) * 100 * 10) / 10;
}

module.exports = createFood;
