import React from 'react';
import Container from 'components/Container';
import FlexWrapper from 'components/FlexWrapper';
import { Wrapper } from './styled';

/** The front page */
const FrontPage = () => {
  const year = new Date().getFullYear();

  return (
    <Wrapper primary>
      <Container>
        <FlexWrapper>
          <a>&copy; { year } KnowYourMacros</a>
          <a>Terms of Service</a>
          <a>Privacy Policy</a>
        </FlexWrapper>
      </Container>
    </Wrapper>
  );
};

export default FrontPage;
