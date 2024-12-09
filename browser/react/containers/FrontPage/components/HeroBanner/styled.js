import styled from 'styled-components';
import media from 'theme/media';

export const MainImageBg = styled.div`
  height: 100vh;
  width: 100%;
  margin-bottom: 1em;
  background-image: url("/images/kym-cover-image.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

export const AnnouncementBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  top: 0px;
  left: 0px;
`;

export const Announcement = styled.div`
  cursor: pointer;
  text-align: center;
  color: white;
  /* font-family: "Raleway", sans-serif; */
  font-weight: 700;
  text-transform: uppercase;
  font-size: 70px;
  ${media.mdDown`
    font-size: 40px;
  `}
`;

export const Msg = styled.h2`
  color: white;
  /* font-family: "Raleway", sans-serif; */
  font-weight: 700;
`;
