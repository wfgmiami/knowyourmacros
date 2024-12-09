const { expect } = require('chai');
const { FoodRecord } = require('../../../db');

describe('ClassMethods', () => {

  const { options: { classMethods } } = FoodRecord;
  const methods = ['findByDate', 'makeHistoricalArray', 'createWithMeal'];

  it('Has classMethods as expected', () => {
    methods.forEach(mth => expect(FoodRecord[mth]).to.be.ok);
  });

  it('All methods are included in testing', () => {
    expect(Object.keys(classMethods).length).to.equal(methods.length);
  });


});

