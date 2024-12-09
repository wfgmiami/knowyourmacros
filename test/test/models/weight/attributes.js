const { expect } = require('chai');

const { Weight } = require('../../../db');

describe('Attributes', () => {

  const { attributes } = Weight;

  const attrs = ['id', 'Seq', 'Amount', 'Description', 'Gr_Wgt', 'createdAt', 'updatedAt', 'abbrev_id'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

