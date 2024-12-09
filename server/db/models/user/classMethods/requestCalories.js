const axios = require('axios');
const Program = require('../../program');

module.exports = requestCalories;

/**
 * Fetch the user's calories from the Fitbit API
 * @param {number} user_id identifies the user
 * @param {string} startDate get calories starting from this date
 * @param {string} endDate get calories ending on this date
 * @this user
 * @async
 */
async function requestCalories(user_id, startDate, endDate) {
  let refreshToken;
  try {
    const user = await this.findOne({ where: { id: user_id } });
    const program = await Program.findOne({
      where: { user_id },
      order: [['createdAt', 'DESC']]
    });
    const token = user.fitbitToken;
    const fitbitId = user.fitbitId;
    refreshToken = user.fitbitRefreshToken;
    let requestStart;
    let requestEnd;

    if (startDate) {
      requestStart = startDate.slice(0, 10);
    } else {
      requestStart = formatDate(program.startDate);
    }

    if (endDate) {
      requestEnd = endDate.slice(0, 10);
    } else if (startDate) {
      requestEnd = startDate;
    } else {
      requestEnd = formatDate(program.endDate);
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return axios.get(`https://api.fitbit.com/1/user/${fitbitId}/activities/calories/date/${requestStart}/${requestEnd}.json`);
  } catch (data) {
    console.log('==========');
    console.log(data);
    console.log('==========');
    return { data, error: true, refreshToken };
  }
}

/**
 * Get the date object into the right format
 * @param {Date} dateObj - An instance of the date object
 * @return {String}
 */
function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();

  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;

  return `${year}-${month}-${date}`;
}
