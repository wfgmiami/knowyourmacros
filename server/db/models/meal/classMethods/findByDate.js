module.exports = findByDate;

/**
 * Find all meals for a given date
 * @param {string} date
 * @param {number} user_id
 * @this meal
 */
function findByDate(date, user_id) {
  if (!user_id) {
    throw new Error('No user_id specified');
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return this.scope('abbrev').findAll({
    where: {
      Date: date,
      user_id
    }
  });
}