/**
 * Find the weight of the food in grams
 * @param {foodrecordType} record food record
 * @return {number}
 */
const getWeight = (record) => {
  console.log(record);
  const unit = record
    .abbrev
    .weights
    .filter((weight) => weight.Description === record.Unit)[0];

  return ((parseFloat(unit.Gr_Wgt)) * (parseFloat(record.Quantity))) / (parseFloat(unit.Amount));
};

/** @type {Object} */
const combStart = {};

/**
 * Combine records which have the same abbrev id
 * @param {Array<foodrecordType>} list list of records
 */
const combineRecords = (list) => Object.values(list.reduce((memo, record) => {
  const mm = { ...memo };
  const { abbrev } = record;
  const grWht = getWeight(record);
  if (mm[abbrev.id]) {
    mm[abbrev.id].gr += grWht;
  } else {
    mm[abbrev.id] = Object.assign(record, { gr: grWht });
  }
  return mm;
}, combStart));

/** @type {Object} */
const listStart = {};

/**
 * Take the combined records and organize them by food group
 * @param {Array<foodrecordType>} list
 * @return {Object}
 */
export const makeList = (list) => {
  const combinedList = combineRecords(list);

  return combinedList.reduce((memo, record) => {
    const mm = { ...memo };
    const foodGroup = record.abbrev.foodDesc.foodGroup.Description;
    if (mm[foodGroup]) {
      mm[foodGroup].push(record);
    } else {
      mm[foodGroup] = [record];
    }
    return mm;
  }, listStart);
};

/**
 * Give the weight in oz
 * @param {foodrecordType} record
 * @return {string} the weight in oz
 */
export const convertWeight = (record) => { // eslint-disable-line
  // const oz = record.abbrev.weights.filter( unit => unit.Description === 'oz' )[
  // 0 ]; const unit = oz ? oz : record.abbrev.weights[ 0 ]; if (unit.Description
  // !== 'oz') {
  return `${Math.round((record.gr * 100) / 28.35) / 100} oz`;
  // } return `${Math.round(record.gr * 10 / (unit.Gr_Wgt * 1) / (unit.Amount *
  // 1)) / 10} ${unit.Description}`;
};
