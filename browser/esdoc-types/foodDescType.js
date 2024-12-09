/**
 * @typedef {Object} foodDescType
 *
 * @property {number} id the id of the record
 * @property {string} Long_Desc long description of the food
 * @property {string} Short_Desc short description of the food
 * @property {string} ComName
 * @property {string} ManufacName
 * @property {string} Survey
 * @property {string} Ref_desc the part of the food which is not typically consumed
 * @property {number} Refuse the percentage of the part of the food which is not typically consumed
 * @property {string} SciName scientific name
 * @property {string} N_Factor
 * @property {string} Pro_Factor
 * @property {string} Fat_Factor
 * @property {string} CHO_Factor
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {number} abbrev_id id of the abbrev record to which this description is applicable
 * @property {number} FdGrp_Cd identifies the food group
 * @property {foodGroupType} foodGroup the food group
 *
 * @example
 * {
 *   id: 2208,
 *   Long_Desc: 'Avocados, raw, California',
 *   Short_Desc: 'AVOCADOS,RAW,CALIFORNIA',
 *   ComName: 'AVOCADOS,RAW,CALIFORNIA',
 *   ManufacName: 'AVOCADOS,RAW,CALIFORNIA',
 *   Survey: 'AVOCADOS,RAW,CALIFORNIA',
 *   Ref_desc: 'AVOCADOS,RAW,CALIFORNIA',
 *   Refuse: 33,
 *   SciName: 'Avocados, raw, California',
 *   N_Factor: '6.25',
 *   Pro_Factor: '6.25',
 *   Fat_Factor: '6.25',
 *   CHO_Factor: '6.25',
 *   createdAt: '2017-10-23T20:48:52.641Z',
 *   updatedAt: '2017-10-23T20:48:52.641Z',
 *   abbrev_id: 5469,
 *   FdGrp_Cd: 900,
 *   foodGroup: {
 *     GroupID: 900,
 *     Description: 'Fruits and Fruit Juices',
 *     createdAt: '2017-10-23T20:48:52.535Z',
 *     updatedAt: '2017-10-23T20:48:52.535Z'
 *   }
 * }
 */

