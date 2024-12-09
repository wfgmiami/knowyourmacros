const { expect } = require('chai');

const { Program } = require('../../../db');

describe('ClassMethods', () => {

  const { options: { classMethods } } = Program;
  const methods = ['makeProgramObject'];

  it('Has methods as expected', () => {
    methods.forEach(mth => expect(classMethods[mth]).to.be.ok);
  });

  it('All methods are included in testing', () => {
    expect(methods.length).to.equal(Object.keys(classMethods).length);
  });

});

