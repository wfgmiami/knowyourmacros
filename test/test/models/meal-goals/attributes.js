const { expect } = require('chai');

const { MealGoals } = require('../../../db');

describe('Attributes', () => {
  const { attributes } = MealGoals;
  const attrs = ['id', 'goals', 'createdAt', 'updatedAt', 'user_id'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

