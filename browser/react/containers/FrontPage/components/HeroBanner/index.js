import React from 'react';
import { MainImageBg, Announcement, AnnouncementBg, Msg } from './styled';

const HeroBanner = () => (
  <MainImageBg>
    <AnnouncementBg>
      <div>
        <Announcement>
          You Set Your Goal - We Help Set Your Diet
        </Announcement>
        <Msg>
          Resources to Improve your Nutrition
        </Msg>
        <Msg>
          Reach Macronutrients Goals to the Exact Gram
        </Msg>
      </div>
    </AnnouncementBg>
  </MainImageBg>
);

export default HeroBanner;
