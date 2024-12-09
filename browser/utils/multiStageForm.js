import React from 'react';
import PropTypes from 'prop-types';

export const Form = React.createContext('multiStageForm');

const MultiStageForm = ({ children }) => {
  return (
    <Form.Provider>
      {children}
    </Form.Provider>
  );
};

export const SubForm = ({ children }) => (
  <Form.Consumer>
    {(value) => React.cloneElement(children, { value })}
  </Form.Consumer>
);

MultiStageForm.propTypes = {
  children: PropTypes.node
};

SubForm.propTypes = {
  children: PropTypes.node
};

export default MultiStageForm;
