/**
 * @typedef {Object} abbrevType
 *
 * @property {string} longname the combined Main and Sub params
 * @property {string} maxMacro 'Protein', 'Carbohydrates', or 'Fat'
 * @property {number} id the database row id of the abbrev record
 * @property {string} Main the general name
 * @property {string} Sub the specific name
 * @property {string} Calories calories per 100g
 * @property {string} Protein protein per 100g
 * @property {string} Carbohydrates carbohydrates per 100g
 * @property {string} Fat fat per 100g
 * @property {string} GmWt_1 a serving gram weight
 * @property {string} GmWt_2 a serving gram weight
 * @property {string} GmWt_Desc1 a serving description
 * @property {string} GmWt_Desc2 a serving description
 * @property {number} UserID the id of the user who added the record
 * @property {Date} createdAt date on which the record was created
 * @property {Date} updatedAt date on which the record was updated
 * @property {Array<weightType>} weights list of servings
 *
 * @example
 *
 *{
 *   longname: 'Avocados, Avocados',
 *   maxMacro: 'Protein',
 *   id: 5469,
 *   Main: 'Avocados',
 *   Sub: 'Avocados',
 *   Calories: '167',
 *   Protein: '167',
 *   Fat: '167',
 *   Carbohydrates: '167',
 *   GmWt_1: '230',
 *   GmWt_Desc1: '1 cup, pureed',
 *   GmWt_2: '136',
 *   GmWt_Desc2: '1 fruit, without skin and seed',
 *   UserID: 0,
 *   createdAt: '2017-10-23T20:48:33.466Z',
 *   updatedAt: '2017-10-23T20:48:33.466Z',
 *   weights: [
 *     {
 *       normalized: {
 *         val: 1,
 *         txt: 'fruit, without skin and seed (136 g)'
 *       },
 *       id: 311,
 *       Seq: 1,
 *       Amount: '1.00',
 *       Description: 'fruit, without skin and seed',
 *       Gr_Wgt: '136.00',
 *       createdAt: '2017-10-23T20:48:57.803Z',
 *       updatedAt: '2017-10-23T20:48:57.803Z',
 *       abbrev_id: 5469
 *     },
 *     {
 *       normalized: {
 *         val: 2,
 *         txt: 'cup, pureed (230 g)'
 *       },
 *       id: 5723,
 *       Seq: 2,
 *       Amount: '1.00',
 *       Description: 'cup, pureed',
 *       Gr_Wgt: '230.00',
 *       createdAt: '2017-10-23T20:48:57.803Z',
 *       updatedAt: '2017-10-23T20:48:57.803Z',
 *       abbrev_id: 5469
 *     },
 *     {
 *       normalized: {
 *         val: 3,
 *         txt: 'NLEA serving (30 g)'
 *       },
 *       id: 5724,
 *       Seq: 3,
 *       Amount: '1.00',
 *       Description: 'NLEA serving',
 *       Gr_Wgt: '30.00',
 *       createdAt: '2017-10-23T20:48:57.803Z',
 *       updatedAt: '2017-10-23T20:48:57.803Z',
 *       abbrev_id: 5469
 *     }
 *   ],
 *   foodDesc: {
 *     id: 2208,
 *     Long_Desc: 'Avocados, raw, California',
 *     Short_Desc: 'AVOCADOS,RAW,CALIFORNIA',
 *     ComName: 'AVOCADOS,RAW,CALIFORNIA',
 *     ManufacName: 'AVOCADOS,RAW,CALIFORNIA',
 *     Survey: 'AVOCADOS,RAW,CALIFORNIA',
 *     Ref_desc: 'AVOCADOS,RAW,CALIFORNIA',
 *     Refuse: 33,
 *     SciName: 'Avocados, raw, California',
 *     N_Factor: '6.25',
 *     Pro_Factor: '6.25',
 *     Fat_Factor: '6.25',
 *     CHO_Factor: '6.25',
 *     createdAt: '2017-10-23T20:48:52.641Z',
 *     updatedAt: '2017-10-23T20:48:52.641Z',
 *     abbrev_id: 5469,
 *     FdGrp_Cd: 900,
 *     foodGroup: {
 *       GroupID: 900,
 *       Description: 'Fruits and Fruit Juices',
 *       createdAt: '2017-10-23T20:48:52.535Z',
 *       updatedAt: '2017-10-23T20:48:52.535Z'
 *     }
 *   }
 * }
 *
 */
