const axios = require('axios');
const app = require('../../../../app');

module.exports = exRefreshToken;

/**
 * Use the refresh token to get a new access token
 * @param {string} refTok refresh token
 * @param {number} user_id identifies the user
 * @return {Promise}
 * @this user
 * @async
 */
async function exRefreshToken(refTok, user_id) {
  const { data } = await axios.post(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refTok}`, null, {
    headers: {
      Authorization: `Basic ${app.get('oauth').fitbitInfo.refreshBuffer}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  const { access_token, refresh_token } = data;
  const user = await this.findById(user_id);
  user.fitbitToken = access_token; // eslint-disable-line
  user.fitbitRefreshToken = refresh_token; // eslint-disable-line
  await user.save();
  const calories = await this.requestCalories(user_id);
  return calories;
}

// function exRefreshToken(refTok, user_id) {
//   return axios.post(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refTok}`, null, {
//     headers: {
//       Authorization: `Basic ${app.get('oauth').fitbitInfo.refreshBuffer}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     }
//   })
//     .then(({ data }) => {
//       const { access_token, refresh_token } = data;
//       this.findById(user_id)
//         .then((user) => {
//           user.fitbitToken = access_token; // eslint-disable-line
//           user.fitbitRefreshToken = refresh_token; // eslint-disable-line
//           return user.save();
//         });
//     })
//     .then(() => this.requestCalories(user_id));
// }
