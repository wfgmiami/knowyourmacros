/**
 * @param {Array<{ fields: Array<string>, path: string }>} map
 */
const progressMap = (map) => (formValues) => {
  if (!formValues) {
    return map[0].path;
  }
  let path = null;
  let percentComplete = 0;
  for (let ix = 0; ix < map.length; ix += 1) {
    if (Array.isArray(map[ix].fields) ? (!allExist(map[ix].fields, formValues)) : (!formValues[map[ix].fields])) {
      if (!path) path = map[ix].path;
    } else {
      percentComplete += (1 / map.length);
    }
  }
  return { path, percentComplete };
};

function allExist(arr, formValues) {
  return arr.reduce((memo, field) => {
    return memo && typeof formValues[field] !== 'undefined' && formValues[field] !== '';
  }, true);
}

export default progressMap;
