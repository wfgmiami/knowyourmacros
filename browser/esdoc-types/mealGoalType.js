/**
 * @typedef {Object} mealGoalType
 *
 * @property {number} id
 * @property {{ train: Array<{protein: number, carbs: number, fat: number}>, rest: Array<{protein: number, carbs: number, fat: number}> }} goals
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {number} user_id
 *
 * @example
 *
 * {
 *   id: 2,
 *   goals: {
 *     train: [
 *       {
 *         protein: 37.1,
 *         carbs: 36,
 *         fat: 16.5
 *        },
 *        {
 *          protein: 0,
 *          carbs: 0,
 *          fat: 0
 *        },
 *        {
 *          protein: 50.6,
 *          carbs: 49.2,
 *          fat: 22.5
 *        },
 *        {
 *          protein: 44.7,
 *          carbs: 43.4,
 *          fat: 19.9
 *        },
 *        {
 *          protein: 33.7,
 *          carbs: 32.8,
 *          fat: 15
 *        },
 *        {
 *          protein: 0,
 *          carbs: 0,
 *          fat: 0
 *        }
 *      ],
 *      rest: [
 *        {
 *          protein: 37.1,
 *          carbs: 27.1,
 *          fat: 16.5
 *        },
 *        {
 *          protein: 0,
 *          carbs: 0,
 *          fat: 0
 *        },
 *        {
 *          protein: 50.6,
 *          carbs: 37,
 *          fat: 22.5
 *        },
 *        {
 *          protein: 44.7,
 *          carbs: 32.7,
 *          fat: 19.9
 *        },
 *        {
 *          protein: 33.7,
 *          carbs: 24.6,
 *          fat: 15
 *        },
 *        {
 *          protein: 0,
 *          carbs: 0,
 *          fat: 0
 *        }
 *      ]
 *    },
 *    createdAt: '2017-10-24T18:47:13.782Z',
 *    updatedAt: '2017-10-24T18:47:13.782Z',
 *    user_id: 3
 *  }
 *
 */
