import React from 'react';
import FlexWrapper from 'components/FlexWrapper';
import styled from 'styled-components';
import Text from 'components/Text';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: ${(props) => (props.noBorder ? 'none' : `1px solid ${props.theme.mediumGray}`)};
  margin-left: ${(props) => (props.indent ? '15px' : '0px')};
`;

function InfoRow({ label, data, indent, noBorder }) {
  return (
    <Wrapper noBorder={noBorder} indent={indent}>
      <FlexWrapper>
        <Text color="halfOpacityBlue" fontSize={13}>{label}</Text>
        <Text color="blue">{data}</Text>
      </FlexWrapper>
    </Wrapper>
  );
}

InfoRow.propTypes = {
  label: PropTypes.string,
  data: PropTypes.any,
  noBorder: PropTypes.bool,
  indent: PropTypes.bool
};

export default InfoRow;
