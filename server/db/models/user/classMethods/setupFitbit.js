const Program = require('../../program');
const UserMeasurement = require('../../user-measurements');

module.exports = setupFitbit;

/**
 * @param {{ id: string }} profile
 * @param {string} token
 * @param {string} refreshToken
 * @this user
 */
async function setupFitbit(profile, token, refreshToken) {
  const { user } = profile._json;
  const [createdUser] = await this.findOrCreate({
    where: { fitbitId: profile.id },
    defaults: {
      fitbitToken: token,
      fitbitRefreshToken: refreshToken,
      firstname: user.firstName,
      lastname: user.lastName,
      password: profile.id,
      birthdate: new Date(new Date(user.dateOfBirth).getTime() - user.offsetFromUTCMillis),
    }
  });
  createdUser.fitbitRefreshToken = refreshToken;
  createdUser.fitbitToken = token;
  const savedUser = await createdUser.save();
  const [measurements] = await UserMeasurement.findOrCreate({
    where: {
      user_id: savedUser.id
    },
    defaults: {
      gender: user.gender,
      age: user.age,
      height: user.heightUnit === 'en_US' ? Math.round(user.height * 0.393701) : user.height,
      units: 'imperial',
      weight: user.weightUnit === 'en_US' ? Math.round(user.weight * 2.20462) : user.weight,
      lifestyle: 'Normal',
      date: new Date()
    }
  });
  await Program.create(Program.makeProgramObject(measurements));
  return savedUser;
}
