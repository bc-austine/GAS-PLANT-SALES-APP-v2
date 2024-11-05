// src/Styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2 {
    color: #333;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
