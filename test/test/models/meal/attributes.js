const { expect } = require('chai');

const { Meal } = require('../../../db');

describe('Attributes', () => {

  const { attributes } = Meal;
  const attrs = ['id', 'date', 'meal', 'public', 'postWorkout', 'createdAt', 'updatedAt', 'user_id'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

