/**
 * @typedef {Object} foodrecordType
 *
 * @property {number} id the record id
 * @property {Date} Date the date of the record
 * @property {number} Meal 1|2|3|4|5|6
 * @property {string} Unit
 * @property {boolean} fromProgram
 * @property {boolean} confirmed
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {number} mealId
 * @property {number} abbrev_id
 * @property {number} user_id
 * @property {string} Main
 * @property {string} Sub
 * @property {number} Calories
 * @property {number} Protein
 * @property {number} Fat
 * @property {number} Carbohydrates
 * @property {string} GmWt_1
 * @property {string} GmWt_2
 * @property {string} GmWt_Desc1
 * @property {string} GmWt_Desc2
 * @property {number} UserID
 * @property {number} Seq
 * @property {number} Gr
 * @property {mealType} meal
 * @property {abbrevType} abbrev
 * @property {Array<weightType>} weights
 * @property {foodDescType} foodDesc
 *
 * @example
 *
 * {
 *   id: 1537,
 *   Date: '2017-11-15T05:00:00.000Z',
 *   Meal: 1,
 *   Quantity: 1,
 *   Unit: 'fruit, without skin and seed',
 *   fromProgram: true,
 *   confirmed: true,
 *   createdAt: '2017-10-23T20:48:33.466Z',
 *   updatedAt: '2017-10-23T20:48:33.466Z',
 *   mealId: 618,
 *   abbrev_id: 5469,
 *   user_id: 3,
 *   abbrev: {
 *     longname: 'Avocados, Avocados',
 *     maxMacro: 'Protein',
 *     id: 5469,
 *     Main: 'Avocados',
 *     Sub: 'Avocados',
 *     Calories: '167',
 *     Protein: '167',
 *     Fat: '167',
 *     Carbohydrates: '167',
 *     GmWt_1: '230',
 *     GmWt_Desc1: '1 cup, pureed',
 *     GmWt_2: '136',
 *     GmWt_Desc2: '1 fruit, without skin and seed',
 *     UserID: 0,
 *     createdAt: '2017-10-23T20:48:33.466Z',
 *     updatedAt: '2017-10-23T20:48:33.466Z',
 *     weights: [
 *       {
 *         normalized: {
 *           val: 1,
 *           txt: 'fruit, without skin and seed (136 g)'
 *         },
 *         id: 311,
 *         Seq: 1,
 *         Amount: '1.00',
 *         Description: 'fruit, without skin and seed',
 *         Gr_Wgt: '136.00',
 *         createdAt: '2017-10-23T20:48:57.803Z',
 *         updatedAt: '2017-10-23T20:48:57.803Z',
 *         abbrev_id: 5469
 *       }
 *     ],
 *     foodDesc: {
 *       id: 2208,
 *       Long_Desc: 'Avocados, raw, California',
 *       Short_Desc: 'AVOCADOS,RAW,CALIFORNIA',
 *       ComName: 'AVOCADOS,RAW,CALIFORNIA',
 *       ManufacName: 'AVOCADOS,RAW,CALIFORNIA',
 *       Survey: 'AVOCADOS,RAW,CALIFORNIA',
 *       Ref_desc: 'AVOCADOS,RAW,CALIFORNIA',
 *       Refuse: 33,
 *       SciName: 'Avocados, raw, California',
 *       N_Factor: '6.25',
 *       Pro_Factor: '6.25',
 *       Fat_Factor: '6.25',
 *       CHO_Factor: '6.25',
 *       createdAt: '2017-10-23T20:48:52.641Z',
 *       updatedAt: '2017-10-23T20:48:52.641Z',
 *       abbrev_id: 5469,
 *       FdGrp_Cd: 900,
 *       foodGroup: {
 *         GroupID: 900,
 *         Description: 'Fruits and Fruit Juices',
 *         createdAt: '2017-10-23T20:48:52.535Z',
 *         updatedAt: '2017-10-23T20:48:52.535Z'
 *       }
 *     }
 *   },
 *   Main: 'Avocados',
 *   Sub: 'Avocados',
 *   Calories: 227.1,
 *   Protein: 227.1,
 *   Fat: 227.1,
 *   Carbohydrates: 227.1,
 *   GmWt_1: '230',
 *   GmWt_Desc1: '1 cup, pureed',
 *   GmWt_2: '136',
 *   GmWt_Desc2: '1 fruit, without skin and seed',
 *   UserID: 0,
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
 *   },
 *   Seq: 1,
 *   Gr: 136,
 *   gr: 136
 * }
 */
