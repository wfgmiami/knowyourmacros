const { expect } = require('chai');

const { Program } = require('../../../db');

describe('Attributes', () => {

  const { attributes } = Program;
  const attrs = ['id', 'startWeight', 'endGoal', 'endWeight', 'startDate', 'endDate', 'status', 'result', 'createdAt', 'updatedAt', 'user_id'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

