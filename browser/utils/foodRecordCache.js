import moment from 'moment';

/** Cache for food records received from database */
class FoodRecordCache {
  /**
   * Add a record to the cache
   * @param {foodrecordType} record
   */
  addRecord(record) {
    const dateString = moment(new Date(record.Date)).format('YYYY-MM-DD');
    if (this[dateString]) {
      /** @type {Array<foodrecordType>} */
      this[dateString].push(record);
    } else {
      /** @type {Array<foodrecordType>} */
      this[dateString] = [record];
    }
  }

  /**
   * Remove a record from the cache based on its id and the date
   * @param {number} recordId - The record id from the database
   * @param {Date} dateObj - Instance of a Date
   */
  removeRecord(recordId, dateObj) {
    const dateString = dateObj.format('YYYY-MM-DD');
    this[dateString] = this[dateString].filter((food) => food.id !== recordId);
  }

  /**
   * Update a record in the cache
   * @param {foodrecordType} record - The food record
   */
  updateRecord(record) {
    const dateString = moment(new Date(record.Date)).format('YYYY-MM-DD');
    this[dateString] = this[dateString].map((rc) => ((rc.id === record.id) ? { ...record } : rc));
  }
}

/** @type {FoodRecordCache} */
const foodRecordCache = new FoodRecordCache();
window.foodRecordCache = foodRecordCache;

/** The cache */
export default foodRecordCache;
