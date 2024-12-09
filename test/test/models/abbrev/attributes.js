const { expect } = require('chai');

const { Abbrev } = require('../../../db');

describe('Attributes', () => {

  const { attributes } = Abbrev;
  const attrs = ['id', 'Main', 'Sub', 'Calories', 'Protein', 'Fat', 'Carbohydrates', 'GmWt_1', 'GmWt_Desc1', 'GmWt_2', 'GmWt_Desc2', 'UserID', 'createdAt', 'updatedAt'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

