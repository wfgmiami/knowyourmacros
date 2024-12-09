import DayMealPlanner from 'containers/DayMealPlanner';
import Day from './Day';
import AllDays from './AllDays';

/** @type {{ path: string, component: React.Component }} */
const routes = {
  path: 'shopping-list',
  component: DayMealPlanner,
  indexRoute: {
    component: AllDays
  },
  childRoutes: [
    {
      path: ':day',
      component: Day
    }
  ]
};

export default routes;
