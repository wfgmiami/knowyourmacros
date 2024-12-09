const { expect } = require('chai');

const { User } = require('../../../db');

describe('ClassMethods', () => {

  const { options: { classMethods } } = User;
  const methods = ['findByPassword', 'setupFitbit', 'requestCalories', 'exRefreshToken', 'addFavoriteFood', 'removeFavoriteFood'];

  it('Has methods as expected', () => {
    methods.forEach(mth => expect(classMethods[mth]).to.be.ok);
  });

  it('All methods are included in testing', () => {
    expect(Object.keys(classMethods).length).to.equal(methods.length);
  });

});

