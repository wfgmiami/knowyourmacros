const cmHeight = (val) => {
  const value = val.replace(/ /g, '');
  if (value.indexOf('\'') > -1) {
    const [ft, inc] = value.split('\'');
    const totalIn = (ft * 12) + (inc ? inc.replace(/"/g, '') * 1 : 0);
    return {
      cmheight: 2.54 * totalIn,
      height: value,
      hunit: 'feet\' inches'
    };
  } else if (value * 1 < 12) {
    return {
      cmheight: value * 12 * 2.54,
      height: value,
      hunit: 'feet\' inches'
    };
  }
  return {
    cmheight: value * 1,
    height: value,
    hunit: 'centimeters'
  };
};

export default cmHeight;
