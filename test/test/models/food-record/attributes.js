const { expect } = require('chai');

const { FoodRecord } = require('../../../db');

console.log('FoodRecord.options');
console.log(Object.keys(FoodRecord.modelManager));

describe('Attributes', () => {
  const { attributes } = FoodRecord;
  const attrs = ['id', 'Date', 'Meal', 'Quantity', 'Unit', 'fromProgram', 'confirmed', 'createdAt', 'updatedAt', 'mealId', 'abbrev_id', 'user_id'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

