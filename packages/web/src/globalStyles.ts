import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: var(--bgcol);
  }
  :root{
    --black: #000;
    --white: #FFF;
    --bgcol: #525252;
    --primary: #414141;
    --secondary: #313131;
  }
`