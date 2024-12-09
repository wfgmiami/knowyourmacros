import React from 'react';

const HorizontalLoader = ({ height, width }) => {
  const leftMost = (parseFloat(width.replace('px', '')) - 100) * -0.75;
  const rightMost = ((parseFloat(width.replace('px', '')) - 100) * 0.75) + 100;
  console.log(leftMost, rightMost);
  return (
    <svg width={width} height={height} viewBox="0 38 100 25" className="lds-ellipsis">
      <circle cx="84" cy="50" r="0" fill="#f7941e">
        <animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="-45" cy="50" r="9.74519" fill="blue">
        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="-0.75s" />
        <animate attributeName="cx" values={`${leftMost};${leftMost};50;${rightMost};${rightMost}`} keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="-0.75s" />
      </circle>
      <circle cx="84" cy="50" r="0.254815" fill="green">
        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="-0.375s" />
        <animate attributeName="cx" values={`${leftMost};${leftMost};50;${rightMost};${rightMost}`} keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="-0.375s" />
      </circle>
      <circle cx="83.1336" cy="50" r="10" fill="red">
        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="cx" values={`${leftMost};${leftMost};50;${rightMost};${rightMost}`} keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="49.1336" cy="50" r="10" fill="#f7941e">
        <animate attributeName="r" values="0;10;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="cx" values={`${leftMost};${leftMost};${leftMost};50;${rightMost}`} keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.5s" repeatCount="indefinite" begin="0s" />
      </circle>
    </svg>
  );
};

export default HorizontalLoader;
