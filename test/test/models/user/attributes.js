const { expect } = require('chai');

const { User } = require('../../../db');

// console.log(Object.keys(User.options.classMethods));

describe('Attributes', () => {
  const { attributes } = User;
  const attrs = ['id', 'firstname', 'lastname', 'username', 'email', 'password', 'birthdate', 'googleId', 'fitbitId', 'fitbitToken', 'fitbitRefreshToken', 'createdAt', 'updatedAt'];

  it('Has attributes as expected', () => {
    attrs.forEach(attr => expect(attributes[attr]).to.be.a('object'));
  });

  it('All attributes are included in testing', () => {
    expect(attrs.length).to.equal(Object.keys(attributes).length);
  });

});

