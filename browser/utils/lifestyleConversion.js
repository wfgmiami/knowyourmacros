/**
 * Convert the lifestyle string to a number
 * @param {string} lifestyle 'Normal', 'Active', or 'Sedentary'
 * @return {number}
 */
export const lifeStyle = (lifestyle) => {
  switch (lifestyle) {
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
 * @param {number} lifestyle
 * @return {string}
 */
export const invertLifeStyle = (lifestyle) => {
  switch (lifestyle) {
    case 1.375:
      return 'Normal';
    case 1.55:
      return 'Active';
    default: // 1.2
      return 'Sedentary';
  }
};
