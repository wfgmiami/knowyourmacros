import React from 'react';
import FlexWrapper from 'components/FlexWrapper';
import PropTypes from 'prop-types';

const Header = ({ index, date }) => (
  <FlexWrapper>
    <div>
      <b>Day {index + 1}</b>
    </div>
    <div>
      {date}
    </div>
  </FlexWrapper>
);

Header.propTypes = {
  index: PropTypes.number,
  date: PropTypes.string
};

export default Header;
