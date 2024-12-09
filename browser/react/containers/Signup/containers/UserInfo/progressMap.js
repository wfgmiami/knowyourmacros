import formProgressMap from 'utils/formProgressMap';

const progressMap = formProgressMap([
  {
    fields: 'gender',
    path: '/signup/user-info/gender'
  }, {
    fields: 'lifestyle',
    path: '/signup/user-info/activity-level'
  }, {
    fields: 'goal',
    path: '/signup/user-info/goal'
  }, {
    fields: 'units',
    path: '/signup/user-info/units'
  }, {
    fields: 'height',
    path: '/signup/user-info/height'
  }, {
    fields: 'weight',
    path: '/signup/user-info/weight'
  }, {
    fields: 'birthdate',
    path: '/signup/user-info/birthdate'
  }, {
    fields: [
      'firstname',
      'lastname',
      'email',
      'password'
    ],
    path: '/signup/user-info/account-info'
  }
]);

export default progressMap;
