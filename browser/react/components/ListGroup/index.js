import styled from 'styled-components';
import Badge from 'components/Badge';
/**
 * A styled `div` element
 * @type {React.Component}
 */
const ListGroup = styled.div`
  background-color: #fff;
  &>* {
    display: block;
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    text-align: left !important;
    border-radius: 0px;
    font-weight: initial !important;
  }

  &>*>${Badge} {
    float: right;
  }

  &>*:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-weight: ${(props) => (props.titleRow ? 'bold !important' : 'initial')};
    text-decoration: ${(props) => (props.titleRow ? 'underline' : 'initial')};
  }

  &>*:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &>*+*{
    border-top: none;
  }
`;

export default ListGroup;
