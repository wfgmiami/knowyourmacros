const { expect } = require('chai');

const { FoodDesc } = require('../../../db');

describe('Attributes', () => {
  const { attributes } = FoodDesc;
  const attrs = ['id', 'Long_Desc', 'Short_Desc', 'ComName', 'ManufacName', 'Survey', 'Ref_desc', 'Refuse', 'SciName', 'N_Factor', 'Pro_Factor', 'Fat_Factor', 'CHO_Factor', 'createdAt', 'updatedAt', 'abbrev_id', 'FdGrp_Cd'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

