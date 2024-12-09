/**
 * @typedef {Object} programType
 * @property {!string} startDate
 * @property {!string} endDate
 * @property {!string} startWeight
 * @property {!string} endGOal
 */

/**
 * Reformat data for the line chart
 * @param {Array} measurements
 * @param {Array<programType>} programs
 * @return {date: Date, weight: number}
 */
const linedata = (measurements = [], programs) => {
  let data = measurements.map((inst) => {
    const dt = new Date(inst.createdAt);
    return { date: dt, weight: parseFloat(inst.weight) };
  });

  if (!programs[0]) return null;
  const program = programs[0];

  const startDate = new Date(program.startDate);
  const endDate = new Date(program.endDate);
  data.splice(0, 0, { date: startDate, weight: parseFloat(program.startWeight) });
  data.push({ date: endDate, weight: parseFloat(program.endGoal) });

  data = data
    .sort((aa, bb) => {
      if (aa.date > bb.date) return 1;
      if (aa.date < bb.date) return -1;
      return 0;
    })
    .map((dta) => ({ ...dta, date: dta.date }));

  return data;
};

export default linedata;

