import React from 'react';
import Apple from 'components/Icon/Foods/apple-1';
import Avocado from 'components/Icon/Foods/avocado';

const foodIconMap = (main, props) => {
  const map = {
    avocados: <Avocado {...props} />,
    apples: <Apple {...props} />
  };

  if (map[main.toLowerCase()]) {
    return map[main.toLowerCase()];
  }
  return null;
};

export default foodIconMap;
