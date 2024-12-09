const { expect } = require('chai');

const { AbbrevMicro } = require('../../../db');

describe('Attributes', () => {
  const { attributes } = AbbrevMicro;
  const attrs = ['id', 'Water', 'Ash', 'Fiber', 'Sugar', 'Calcium', 'Iron', 'Magnesium', 'Phosphorus', 'Potassium', 'Sodium', 'Zinc', 'Copper', 'Manganese', 'Selenium', 'Vit_C', 'Thiamin', 'Riboflavin', 'Niacin', 'Panto_acid', 'Vit_B6', 'Folate_Tot', 'Folic_acid', 'Food_Folate', 'Folate_DFE', 'Choline_Tot', 'Vit_B12', 'Vit_A_IU', 'Vit_A_RAE', 'Retinol', 'Alpha_Carot', 'Beta_Carot', 'Beta_Crypt', 'Lycopene', 'Lut_Zea', 'Vit_E', 'Vit_D_mcg', 'Vit_D_IU', 'Vit_K', 'FA_Sat', 'FA_Mono', 'FA_Poly', 'Cholestrl', 'createdAt', 'updatedAt', 'abbrev_id'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });
});

