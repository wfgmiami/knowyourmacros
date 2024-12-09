// import AccountInfo from './containers/AccountInfo';
import UserInfoRoutes from './containers/UserInfo/routes';
import MealGoals from './containers/MealGoals';

/** @type {{ path: string, component: React.Component }} */
const routes = {
  path: 'signup',
  childRoutes: [
    UserInfoRoutes,
    {
      path: 'goals',
      component: MealGoals
    }
  ]
};

export default routes;
