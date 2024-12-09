import styled from 'styled-components';
import media from 'theme/media';
import FlexWrapper from 'components/FlexWrapper';
import Label from 'components/Label';
/**
 * @type {React.Component}
 */
export const RowWrapper = styled(FlexWrapper)`
  &+& {
    margin-top: 8px;
  }
  ${media.mdDown`
    &+& {
      border-top: 1px dashed #ccc;
    }
    font-size: 12px;
    padding-top: 6px;
    display: block;
  `}
`;

export const FoodLabel = styled.span`
  ${media.mdDown`
    font-weight: bold;
    color: #555;
  `}
`;

export const AmountLabel = styled(Label)`
  ${media.mdDown`
    border: none;
    background-color: inherit;
    font-size: 8pt;
    color: gray;
    text-align: right;
    margin-top: 0.3em;
    display: block !important;
    clear: both;
  `}
`;
