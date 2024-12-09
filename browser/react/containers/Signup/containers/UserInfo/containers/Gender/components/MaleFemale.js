import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FlexWrapperBase from 'components/FlexWrapper';
// import Well from 'components/Well';
import Text from 'components/Text';
import Boy from 'components/Icon/People/Boy';
import Girl from 'components/Icon/People/Girl';

const Button = styled.button`
  cursor: pointer;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? props.theme.green : '#fff')};
  width: 45%;
  text-align: center;
  margin-bottom: 1rem;
`;

const FlexWrapper = FlexWrapperBase.extend`
  margin-bottom: 1rem;
`;

function MaleFemale({ input }) {
  return (
    <FlexWrapper>
      <Button onClick={() => input.onChange('Male')} selected={input.value === 'Male'}>
        <Boy height="120px" width="120px" />
        <Text centered color={input.value === 'Male' && 'green'}>Male</Text>
      </Button>
      <Button onClick={() => input.onChange('Female')} selected={input.value === 'Female'}>
        <Girl height="120px" width="120px" />
        <Text centered color={input.value === 'Female' && 'green'}>Female</Text>
      </Button>
    </FlexWrapper>
  );
}

MaleFemale.propTypes = {
  input: PropTypes.object
};

export default MaleFemale;
