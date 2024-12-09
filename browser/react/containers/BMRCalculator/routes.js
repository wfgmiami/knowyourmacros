import Measurements from './components/Measurements';
import ModifyMaintenanceCals from './components/ModifyMaintenanceCals';

/** @type {{ path: string, indexRoute: {component: React.Component}, childRoutes: Array }} */
const routes = {
  path: 'bmr',
  indexRoute: {
    component: Measurements,
  },
  childRoutes: [
    {
      path: 'maintenance',
      component: ModifyMaintenanceCals
    }
  ]
};

export default routes;
