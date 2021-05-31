import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body, #root {
    height: 100%;
}
:root {
    --background-primary: #99d0ce;
    --text-primary: white;
}
`