const { expect } = require('chai');

const { FoodRecord } = require('../../../db');

describe('InstanceMethods', () => {

  const { options: { instanceMethods } } = FoodRecord;

  const methods = ['calMacros', 'updateQuantity'];

  it('Has methods as expected', () => {
    methods.forEach(mth => expect(instanceMethods[mth]).to.be.ok);
  });

  it('All methods are included in testing', () => {
    expect(Object.keys(instanceMethods).length).to.equal(methods.length);
  });

});

