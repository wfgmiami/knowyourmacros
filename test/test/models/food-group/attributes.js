const { expect } = require('chai');

const { FoodGroup } = require('../../../db');

describe('Attributes', () => {

  const { attributes } = FoodGroup;

  const attrs = ['GroupID', 'Description', 'createdAt', 'updatedAt'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

