/**
 * Convert the lifestyle string to a number
 * @param {Object} user The user
 * @param {string} user.lifestyle 'Normal', 'Active', or 'Sedentary'
 * @return {number}
 */
export const lifeStyle = (user) => {
  switch (user.lifestyle) {
    case 'Normal':
      return 1.375;
    case 'Active':
      return 1.55;
    default: // Sedentary
      return 1.2;
  }
};

/**
 * Converts the lifestyle number to a string
 * @param {Object} state
 * @param {number} state.lifestyle
 */
export const invertLifeStyle = (state) => {
  switch (state.lifestyle) {
    case 1.375:
      return 'Normal';
    case 1.55:
      return 'Active';
    default: // 1.2
      return 'Sedentary';
  }
};
