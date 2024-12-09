import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background: #FBFBFB;
  }
  @font-face {
    font-family: 'Ubuntu';
    src: url('/public/fonts/Ubuntu-R.ttf') format('truetype');
    /* font-weight: normal;
    font-style: normal; */
  }
  @font-face {
    font-family: 'Ubuntu-Medium';
    src: url('/public/fonts/Ubuntu-M.ttf') format('truetype');
    /* font-weight: normal;
    font-style: normal; */
  }
  @font-face {
    font-family: 'Ubuntu-Light';
    src: url('/public/fonts/Ubuntu-L.ttf') format('truetype');
    /* font-weight: normal;
    font-style: normal; */
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu-Light', 'Helvetica Neue', 'Arial', sans-serif !important;
    font-weight: 300;
  }

  button, input, select {
    font-family: 'Ubuntu-Light', 'Helvetica Neue', 'Arial', sans-serif !important;
    font-weight: 300;
  }

  #app {
    background-color: #FBFBFB;
    height: 100%;
    min-width: 100%;
  }
`;
