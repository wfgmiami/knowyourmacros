import { fork, all } from 'redux-saga/effects';
import userSaga from 'containers/User/sagas';
import foodRecordSaga from 'containers/FoodRecord/sagas';
import changeDaySaga from 'containers/ChangeDay/sagas';
import navSaga from 'containers/Nav/sagas';
import loginSaga from 'containers/Login/sagas';
import homeSaga from 'containers/Home/sagas';
import databaseSaga from 'containers/Database/sagas';
import dayMealPlannerSaga from 'containers/DayMealPlanner/sagas';
import mealPlannerSaga from 'containers/MealPlanner/sagas';
import listSaga from 'containers/List/sagas';
import microReportSaga from 'containers/MicronutrientReport/sagas';
import publicMealsSaga from 'containers/PublicMeals/sagas';
import setGoalsSaga from 'containers/SetGoals/sagas';
import bmrCalculatorSaga from 'containers/BMRCalculator/sagas';
import signupSaga from 'containers/Signup/sagas';

const rootSaga = function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(foodRecordSaga),
    fork(changeDaySaga),
    fork(bmrCalculatorSaga),
    fork(navSaga),
    fork(loginSaga),
    fork(homeSaga),
    fork(databaseSaga),
    fork(dayMealPlannerSaga),
    fork(mealPlannerSaga),
    fork(microReportSaga),
    fork(publicMealsSaga),
    fork(setGoalsSaga),
    fork(signupSaga),
    fork(listSaga)
  ]);
};

export default rootSaga;

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.hzfEQOcJdvat6x_di6IDwi_tykCfKIAeehBukstyS14
