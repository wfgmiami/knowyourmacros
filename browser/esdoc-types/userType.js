/**
 * @typedef {Object} userType
 *
 * @property {number} id
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} [username]
 * @property {string} [email]
 * @property {string} password
 * @property {Date} birthdate
 * @property {string} googleId
 * @property {string} fitbitId
 * @property {string} fitbitToken
 * @property {string} fitbitRefreshToken
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Array<programType>} programs
 * @property {Array<mealGoalType>} mealGoals
 * @property {Array<userMeasurementsType>} userMeasurements
 *
 * @example
 *
 * {
 *   id: 3,
 *   firstname: 'Richard',
 *   lastname: 'Richard',
 *   username: null,
 *   email: null,
 *   password: 'a1s2d3f4d5f151f5sf45sd54f',
 *   birthdate: '1989-06-02T04:00:00.000Z',
 *   googleId: 'a1s2d3f4d5f151f5sf45sd54f',
 *   fitbitId: 'a1s2d3f4d5f151f5sf45sd54f',
 *   fitbitToken: 'a1s2d3f4d5f151f5sf45sd54f',
 *   fitbitRefreshToken: 'a1s2d3f4d5f151f5sf45sd54f',
 *   createdAt: '2017-10-24T18:47:04.836Z',
 *   updatedAt: '2017-11-13T03:49:46.799Z',
 *   programs: [
 *     {
 *       id: 1,
 *       startWeight: '181',
 *       endGoal: '176',
 *       endWeight: null,
 *       startDate: '2017-10-24T04:00:00.000Z',
 *       endDate: '2017-11-28T05:00:00.000Z',
 *       status: 'In Progress',
 *       result: 'TBD',
 *       createdAt: '2017-10-24T18:47:05.407Z',
 *       updatedAt: '2017-10-24T18:47:05.407Z',
 *       user_id: 3
 *     }
 *   ],
 *   mealGoals: [
 *     {
 *       id: 2,
 *       goals: {
 *         train: [
 *           {
 *             protein: 37.1,
 *             carbs: 36,
 *             fat: 16.5
 *           },
 *           {
 *             protein: 0,
 *             carbs: 0,
 *             fat: 0
 *           },
 *           {
 *             protein: 50.6,
 *             carbs: 49.2,
 *             fat: 22.5
 *           },
 *           {
 *             protein: 44.7,
 *             carbs: 43.4,
 *             fat: 19.9
 *           },
 *           {
 *             protein: 33.7,
 *             carbs: 32.8,
 *             fat: 15
 *           },
 *           {
 *             protein: 0,
 *             carbs: 0,
 *             fat: 0
 *           }
 *         ],
 *         rest: [
 *           {
 *             protein: 37.1,
 *             carbs: 27.1,
 *             fat: 16.5
 *           },
 *           {
 *             protein: 0,
 *             carbs: 0,
 *             fat: 0
 *           },
 *           {
 *             protein: 50.6,
 *             carbs: 37,
 *             fat: 22.5
 *           },
 *           {
 *             protein: 44.7,
 *             carbs: 32.7,
 *             fat: 19.9
 *           },
 *           {
 *             protein: 33.7,
 *             carbs: 24.6,
 *             fat: 15
 *           },
 *           {
 *             protein: 0,
 *             carbs: 0,
 *             fat: 0
 *           }
 *         ]
 *       },
 *       createdAt: '2017-10-24T18:47:13.782Z',
 *       updatedAt: '2017-10-24T18:47:13.782Z',
 *       user_id: 3
 *     }
 *   ],
 *   userMeasurements: [
 *     {
 *       id: 2,
 *       gender: 'MALE',
 *       height: '73',
 *       units: 'imperial',
 *       weight: '181',
 *       bodyfat: null,
 *       lifestyle: 'Normal',
 *       goal: null,
 *       createdAt: '2017-10-24T18:47:05.321Z',
 *       updatedAt: '2017-10-24T18:47:05.321Z',
 *       user_id: 3
 *     }
 *   ]
 * }
 */

