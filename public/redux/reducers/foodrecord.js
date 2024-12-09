import store from '../store';
import axios from 'axios';
import { ADD_MEAL, CHANGE_DAY, CONFIRM_RECORD, MEALS, RECEIVE_CALORIES, RECEIVE_FOOD_SEARCH_RESULT, REQUEST_DATA, RECEIVE_FOOD_RECORD, REMOVE_FOOD_RECORD_ITEM, UPDATE_RECORD, UPDATE_RECORD_QUANTITY } from '../constants';
import { getToken, debounce } from './root';

const initialState = {
  addMeal: 1,
  foodSearchResults: [],
  calories: 0
};

/** Cache for food records received from database */
class FoodRecordCache {
  /**
   * Add a record to the cache
   * @param {object} record
   */
  addRecord(record) {
    let dateString = new Date(record.Date).toDateString().slice(4);
    if (this[dateString]) {
      this[dateString].push(record);
    } else {
      this[dateString] = [record];
    }
  }

  /**
   * Remove a record from the cache based on its id and the date
   * @param {number} recordId - The record id from the database
   * @param {Date} dateObj - Instance of a Date
   */
  removeRecord(recordId, dateObj) {
    let dateString = dateObj.toDateString().slice(4);
    this[dateString] = this[dateString].filter(food => food.id !== recordId);
  }

  /**
   * Update a record in the cache
   * @param {object} record - The food record
   */
  updateRecord(record) {
    let dateString = new Date(record.Date).toDateString().slice(4);
    this[dateString] = this[dateString].map(rc => {
      if (rc.id === record.id) {
        rc = Object.assign({}, record);
      }
      return rc;
    });
  }
}

/** Cache for calories received from Fitbit */
class CaloriesCache {
  /**
   * Add a record to the cache
   * @param {object} record
   */
  addRecord(record) {
    this[record.dateTime] = record.value * 1;
  }

  /**
   * Add records in an array to cache
   * @param {[object]} records
   */
  bulkAddRecord(records) {
    if (Array.isArray(records)) {
      records.forEach(record => this.addRecord(record));
    }
  }

  /**
   * Return if a record for the unputted date exists, and the date is not the current date
   * @param {Date} dateInp - A date object
   * @return {boolean}
   */
  hasRecord(dateInp) {
    const date = this.convertDate(dateInp);
    return date !== this.convertDate(new Date()) && !isNaN(this[date] + 1) && !isNaN(this[dateInp] + 1);
  }

  /**
   * Take a date object and convert it to yyyy-mm-dd
   * @param {Date} dateObj
   * @return {string}
   */
  convertDate(dateObj) {
    if (!dateObj) return null;
    if (typeof dateObj === 'string' && dateObj.split('-').length === 3) {
      return dateObj;
    }
    let dt = (dateObj instanceof Date) ? dateObj : new Date(dateObj);
    dt = new Date(dt.getTime());
    dt = dt.toLocaleDateString().split('/');
    return `${dt[2]}-${dt[0].length === 1 ? '0' + dt[0] : dt[0]}-${dt[1]}`;
  }
}

export const caloriesCache = new CaloriesCache;
export const foodRecordCache = new FoodRecordCache;

export default (state = initialState, action) => {
  switch (action.type) {

  case ADD_MEAL:
    state = changeState({ addMeal: action.payload });
    break;

  case RECEIVE_FOOD_SEARCH_RESULT:
    state = changeState({ foodSearchResults: action.payload });
    break;

  case RECEIVE_CALORIES:
    state = changeState({ calories: action.payload });
    break;

  default:
    break;
  }

  return state;

  function changeState(obj) {
    return Object.assign({}, state, obj);
  }
};

/**
 * Modify a record to udate the quantity
 * @param {object} record
 * @param {number} quant
 */
export const updateQuantity = (record, quant) => dispatch => {
  return axios.put(`/api/food-record/quantity/${record.id}`, quant)
    .then(({ data }) => dispatch({ type: UPDATE_RECORD_QUANTITY, payload: data }));
};

/**
 * Search for foods
 * @param {string} queryString 
 */
export const fetchFoods = queryString => dispatch => {
  dispatch({ type: REQUEST_DATA });
  return axios.get(`/api/food/${queryString}`)
    .then(({ data }) => {
      dispatch({ type: RECEIVE_FOOD_SEARCH_RESULT, payload: data });
    });
};

export const addFoodRecord = ({ abbrev_id, date, meal, quantity, unit, confirmed }) => dispatch => {

};

/**
 * Add records to the database
 * @param {integer} meal
 * @param {integer} mealId
 * @param {string} date
 */
export const handleAddMeal = (meal, mealId, date) => dispatch => {
  meal.forEach(factor => {
    factor.foods.forEach(food => {

      const quantities = modWeight(food, factor.weight);

      axios.post(`/api/food-record`, {
          abbrev_id: food.id,
          date: date.toDateString(),
          meal: mealId,
          quantity: quantities[0],
          unit: food.weights[0].Seq,
          confirmed: false
        }, { params: { token: getToken() } })
        .then(({ data }) => {
          dispatch({
            type: RECEIVE_FOOD_RECORD,
            payload: data
          });
        });

    });
  });
};

/**
 * Take the weight from food records and round them to 1/10
 * @param {{ weights: {gr: number, Gr_Wgt: number, Amount: number}}} food
 * @param {{gr: number}} weight
 */
const modWeight = (food, weight) => {
  return food.weights.map(wt => {
    return Math.round(weight.gr / (wt.Gr_Wgt * 1) * (wt.Amount * 1) * 10) / 10;
  });
};

/**
 * Add all food records for the day to the database
 * @param {[[{foods: [{weight: number, weights:[{Seq: number}], id: number}]}]]} dayMeals
 * @param {Date|string} date - Instance of Date, or a string
 */
export const handleAddDay = (dayMeals, date) => dispatch => {
  dayMeals.map((meal, ix) => {
    if (meal) {
      meal.map(factor => {
        factor.foods.map((food) => {

          const quantities = modWeight(food, factor.weight);
          axios.post(`/api/food-record`, {
              abbrev_id: food.id,
              date: typeof date === 'string' ? date : date.toDateString(),
              meal: ix + 1,
              quantity: quantities[0],
              unit: food.weights[0].Seq,
              confirmed: false
            }, { params: { token: getToken() } })
            .then(({ data }) => {
              dispatch({
                type: RECEIVE_FOOD_RECORD,
                payload: data
              });
            });
        });
      });
    }
  });
};

/**
 * Add a food record to the database
 * @param {object} record
 */
export const handleAddFoodRecord = record => dispatch => {
  axios.post(`/api/food-record`, record, { params: { token: getToken() } })
    .then(({ data }) => {
      dispatch({
        type: RECEIVE_FOOD_RECORD,
        payload: data
      });
    });
};

/**
 * Retrieve a food record from the database
 * @param {string} datestring
 */
export const fetchFoodRecord = datestring => dispatch => {
  if (datestring === 'Invalid Date') return;
  datestring = datestring.slice(4);
  if (!foodRecordCache[datestring]) {
    return axios.get(`/api/food-record/${datestring}`, { params: { token: getToken() } })
      .then(({ data }) => {
        foodRecordCache[datestring] = data;
        dispatch({ type: RECEIVE_FOOD_RECORD, payload: data });
      });
  } else {
    dispatch({ type: RECEIVE_FOOD_RECORD, payload: foodRecordCache[datestring] });
  }
};

/**
 * Get calories from the cache
 * @param {Date} startDate
 */
const receiveCalories = (startDate = new Date()) => dispatch => {
  dispatch({ type: RECEIVE_CALORIES, payload: caloriesCache[startDate] });
};

const getCalsDb = debounce((startDate, endDate, dispatch) => {
  return axios.get('/api/fitbit/calories', { params: {
    token: getToken(),
    startDate: caloriesCache.convertDate(startDate),
    endDate: caloriesCache.convertDate(endDate || startDate)
  } })
    .then(({ data }) => {
      caloriesCache.bulkAddRecord(data);
      dispatch({ type: RECEIVE_CALORIES, payload: data[0].value * 1 });
    });
}, 300);

/**
 * Retrieve calories
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {AxiosPromise}
 */
export const getCalories = (startDate, endDate) => dispatch => {
  if (!isNaN(caloriesCache[caloriesCache.convertDate(startDate)] + 1)) {
    startDate = caloriesCache.convertDate(startDate);
    dispatch(receiveCalories(startDate));
  }
  if (startDate && caloriesCache.hasRecord(caloriesCache.convertDate(startDate))) {
    dispatch(receiveCalories(startDate));
    return Promise.resolve();
  }

  return getCalsDb(startDate, endDate, dispatch);

  // return axios.get('/api/fitbit/calories', { params: {
  //   token: getToken(),
  //   startDate: caloriesCache.convertDate(startDate),
  //   endDate: caloriesCache.convertDate(endDate || startDate)
  // } })
  // .then(({ data }) => {
  //   caloriesCache.bulkAddRecord(data);
  //   dispatch({ type: RECEIVE_CALORIES, payload: data[0].value * 1 });
  // });
};

/**
 * Update the date for the whole application
 * @param {Date} dateObj
 */
export const changeDay = dateObj => dispatch => {
  dispatch({ type: CHANGE_DAY, payload: dateObj });
  dispatch(fetchFoodRecord(dateObj.toDateString()));
  dispatch(getCalories(dateObj));
};

/** Forward increment one day for the whole application */
export const nextDayClick = () => dispatch => {
  const currentDay = store.getState().root.date;
  const nextDay = new Date(currentDay.getTime() + 60 * 60 * 24 * 1000);
  dispatch(changeDay(nextDay));
};

/** Backward increment one day for the whole application */
export const previousDayClick = () => dispatch => {
  const currentDay = store.getState().root.date;
  const previousDay = new Date(currentDay.getTime() - 60 * 60 * 24 * 1000);
  dispatch(changeDay(previousDay));
};

/**
 * Update the record status to 'confirmed' in the database
 * @param {number} id - the record id
 */
export const confirmRecord = id => dispatch => {
  return axios.put(`/api/food-record/${id}/true`, { params: { token: getToken() } })
    .then(({ data }) => dispatch({ type: CONFIRM_RECORD, payload: data.id }));
};

/**
 * Get the day's macronutrients in raw numbers as well as percentages
 * @param {[{Calories: number, Protein: number, Carbohydrates: number, Fat: number}]} records - array of records
 */
export const calculateDayMacros = records => {
  /**
   * Reduce the array and return a rounded summation of the parameter
   * @param {[{Calories: number, Protein: number, Carbohydrates: number, Fat: number}]} arr
   * @param {string} param - The macronutrient
   * @return {number}
   */
  const reduceRound10 = (arr, param) => Math.round(arr.reduce((total, food) => total + food[param], 0) * 10) / 10;

  const confirmed = records.filter(fd => fd.confirmed);

  const calories = Math.round(reduceRound10(confirmed, 'Calories'));
  const protein = reduceRound10(confirmed, 'Protein');
  const carbs = reduceRound10(confirmed, 'Carbohydrates');
  const fat = reduceRound10(confirmed, 'Fat');

  const totalCals = protein * 4 + carbs * 4 + fat * 9;

  return {
    raw: { calories, protein, carbs, fat },
    percentCals: {
      calories: totalCals,
      protein: Math.round(protein * 4000 / totalCals) / 10,
      carbs: Math.round(carbs * 4000 / totalCals) / 10,
      fat: Math.round(fat * 9000 / totalCals) / 10
    }
  };
};

/**
 * Change the meal id regarding which meal to which a record is added
 * @param {!number} mealIdx - integer between 1 and 6
 */
export const changeAddMeal = mealIdx => dispatch => {
  const meals = MEALS.slice();
  $('#myModal').modal();
  dispatch({ type: ADD_MEAL, payload: { id: mealIdx, name: meals[mealIdx - 1] } });
};

/**
 * Dispatch to get foods based on the query string
 * @param {string} foodquery - The name of a food
 */
export const searchFoods = foodquery => dispatch => {
  dispatch(fetchFoods(foodquery));
};

/**
 * Remove a food record from the database
 * @param {number} id - Record id (an integer)
 */
export const destroyFoodRecord = id => dispatch => {
  return axios.delete(`/api/food-record`, { data: { id } })
    .then(() => dispatch({ type: REMOVE_FOOD_RECORD_ITEM, payload: id }));
};

/**
 * Update the database to make a meal public
 * @param {number} mealId - Meal id (an integer)
 */
export const makeMealPublic = mealId => dispatch => {
  return axios.put(`/api/food-record/meal`, { mealId }, { params: { token: getToken() } })
    .then(({ data }) => dispatch({ type: UPDATE_RECORD, payload: data }));
};

