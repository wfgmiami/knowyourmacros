import HomeRoutes from 'containers/Home/routes';
import FoodRecordRoutes from 'containers/FoodRecord/routes';
import MealPlannerRoutes from 'containers/MealPlanner/routes';
import DayMealPlannerRoutes from 'containers/DayMealPlanner/routes';
import PublicMealsRoutes from 'containers/PublicMeals/routes';
import DatabaseRoutes from 'containers/Database/routes';
import ListRoutes from 'containers/List/routes';
import LoginRoutes from 'containers/Login/routes';
import SignupRoutes from 'containers/Signup/routes';
import SetGoalsRoutes from 'containers/SetGoals/routes';
import MicronutrientReportRoutes from 'containers/MicronutrientReport/routes';
import BMRRoutes from 'containers/BMRCalculator/routes';
import UserRoutes from 'containers/User/routes';
import Main from './Main';

/** @type {Array<{component: React.Component, childRoutes: Array}>} */
const routes = [
  {
    component: Main,
    childRoutes: [
      HomeRoutes,
      FoodRecordRoutes,
      MealPlannerRoutes,
      DayMealPlannerRoutes,
      PublicMealsRoutes,
      SetGoalsRoutes,
      ListRoutes,
      DatabaseRoutes,
      MicronutrientReportRoutes,
      BMRRoutes,
      UserRoutes
    ]
  },
  LoginRoutes,
  SignupRoutes
];

console.log(routes);

export default routes;
