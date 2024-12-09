const { expect } = require('chai');
const db = require('../../../db');
const { Abbrev } = db;


describe('ClassMethods', () => {

  const { options: { classMethods } } = Abbrev;

  const methods = ['calculateMacros', 'fpCalculateMacros', 'getFactors', 'getMacros', 'calcWeights', 'dayCalculation'];

  it('Has methods as expected', () => {
    methods.forEach(mth => expect(classMethods[mth]).to.be.ok);
  });

  it('All methods are included in testing', () => {
    expect(Object.keys(classMethods).length).to.equal(methods.length);

    // db.seed()
    //   .then(() => done());
  });

  it('Gives a longname upon find', done => {
    Abbrev.findOne()
      .then(record => expect(record.longname).to.be.ok)
      .then(() => done())
      .catch(done);
  });

  it('Gives a maxMacro upon find', done => {
    Abbrev.findById(2514)
      .then(record => expect(record.maxMacro).to.be.ok)
      .then(() => done())
      .catch(done);
  });

  it('(getFactors) Gets food factors as appropriate', done => {
    Abbrev.findAll()
      .then(foods => Abbrev.getFactors(foods))
      .then(factors => {
        expect(factors.pFood.p).to.equal(55.19);
        expect(factors.pFood.c).to.equal(0);
        expect(factors.pFood.f).to.equal(16.49);
        expect(factors.pFood.weight).to.equal(200);
        expect(factors.pFood.foods.length).to.equal(2);
        expect(factors.pFood.foods[0].id).to.equal(2514);
        expect(factors.pFood.foods[1].id).to.equal(2583);

        expect(factors.cFood.p).to.equal(1.37);
        expect(factors.cFood.c).to.equal(17.72);
        expect(factors.cFood.f).to.equal(0.14);
        expect(factors.cFood.weight).to.equal(100);
        expect(factors.cFood.foods.length).to.equal(1);
        expect(factors.cFood.foods[0].id).to.equal(2768);

        expect(factors.fFood.p).to.equal(2.23);
        expect(factors.fFood.c).to.equal(7.82);
        expect(factors.fFood.f).to.equal(10.06);
        expect(factors.fFood.weight).to.equal(100);
        expect(factors.fFood.foods.length).to.equal(1);
        expect(factors.fFood.foods[0].id).to.equal(5470);
      })
      .then(() => done())
      .catch(done);
  });

  it('(calculateMacros) Gives accurate food calculations', done => {
    const goals = { proteinGoal: 20, carbGoal: 30, fatGoal: 10 };

    Abbrev.findAll()
      .then(foods => Abbrev.calculateMacros(goals, null, foods))
      .then(result => {
        const total = result.reduce((memo, fa) => {
          let { macros } = fa;
          memo.protein += macros.protein;
          memo.carbs += macros.carbs;
          memo.fat += macros.fat;
          return memo;
        }, { protein: 0, carbs: 0, fat: 0 });
        expect(total.protein).to.be.closeTo(20, 0.3);
        expect(total.carbs).to.be.closeTo(30, 0.3);
        expect(total.fat).to.be.closeTo(10, 0.3);
      })
      .then(() => done())
      .catch(done);
  });

});

// [{
//   "foods": [{
//     "longname": "Chicken, broilers or fryers, breast, meat only, cooked, roasted",
//     "maxMacro": "Protein",
//     "id": 2514,
//     "Main": "Chicken",
//     "Sub": "broilers or fryers, breast, meat only, cooked, roasted",
//     "Calories": "165",
//     "Protein": "31.02",
//     "Fat": "3.57",
//     "Carbohydrates": "0.00",
//     "GmWt_1": "140",
//     "GmWt_Desc1": "1 cup, chopped or diced",
//     "GmWt_2": "52",
//     "GmWt_Desc2": "1 unit,  (yield from 1 lb ready-to-cook chicken)",
//     "UserID": 0,
//     "createdAt": "2017-06-26T16:08:17.094Z",
//     "updatedAt": "2017-06-26T16:08:17.094Z"
//   }, {
//     "longname": "Chicken, broilers or fryers, leg, meat and skin, cooked, stewed",
//     "maxMacro": "Protein",
//     "id": 2583,
//     "Main": "Chicken",
//     "Sub": "broilers or fryers, leg, meat and skin, cooked, stewed",
//     "Calories": "220",
//     "Protein": "24.17",
//     "Fat": "12.92",
//     "Carbohydrates": "0.00",
//     "GmWt_1": "140",
//     "GmWt_Desc1": "1 cup, chopped or diced",
//     "GmWt_2": "75",
//     "GmWt_Desc2": "1 unit,  (yield from 1 lb ready-to-cook chicken)",
//     "UserID": 0,
//     "createdAt": "2017-06-26T16:08:17.094Z",
//     "updatedAt": "2017-06-26T16:08:17.094Z"
//   }],
//   "weight": { "gr": 61, "oz": 2.1 },
//   "macros": { "protein": 16.8, "carbs": 0, "fat": 5 }
// }, {
//   "foods": [{
//     "longname": "Sweet potato, cooked, boiled, without skin, with salt",
//     "maxMacro": "Carbohydrates",
//     "id": 2768,
//     "Main": "Sweet potato",
//     "Sub": "cooked, boiled, without skin, with salt",
//     "Calories": "76",
//     "Protein": "1.37",
//     "Fat": "0.14",
//     "Carbohydrates": "17.72",
//     "GmWt_1": "328",
//     "GmWt_Desc1": "1 cup, mashed",
//     "GmWt_2": "151",
//     "GmWt_Desc2": "1 medium",
//     "UserID": 0,
//     "createdAt": "2017-06-26T16:08:17.094Z",
//     "updatedAt": "2017-06-26T16:08:17.094Z"
//   }],
//   "weight": { "gr": 149, "oz": 5.2 },
//   "macros": { "protein": 2, "carbs": 26.4, "fat": 0.2 }
// }, {
//   "foods": [{
//     "longname": "Avocados, raw, Florida",
//     "maxMacro": "Fat",
//     "id": 5470,
//     "Main": "Avocados",
//     "Sub": "raw, Florida",
//     "Calories": "120",
//     "Protein": "2.23",
//     "Fat": "10.06",
//     "Carbohydrates": "7.82",
//     "GmWt_1": "230",
//     "GmWt_Desc1": "1 cup, pureed",
//     "GmWt_2": "304",
//     "GmWt_Desc2": "1 fruit, without skin and seeds",
//     "UserID": 0,
//     "createdAt": "2017-06-26T16:08:17.094Z",
//     "updatedAt": "2017-06-26T16:08:17.094Z"
//   }],
//   "weight": { "gr": 47, "oz": 1.7 },
//   "macros": { "protein": 1, "carbs": 3.7, "fat": 4.7 }
// }]

