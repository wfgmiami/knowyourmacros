import Add from 'containers/Database/containers/Add';
import ServingRoutes from 'containers/Database/containers/Add/containers/Serving/routes';
import MacronutrientsRoutes from 'containers/Database/containers/Add/containers/Macronutrients/routes';

/** @type {{ path: string, component: React.Component, childRoutes: Array }} */
const routes = {
  path: 'add',
  indexRoute: {
    component: Add
  },
  childRoutes: [
    ServingRoutes,
    MacronutrientsRoutes
  ]
};

export default routes;
