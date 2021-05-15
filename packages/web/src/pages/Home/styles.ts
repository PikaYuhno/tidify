import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';



export const Main = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 2.5%;
  height: 75vh;
  font-size: 20px;
  color: white;
  border-radius: 15px;
  background-color: #414141;
`
export const Grid = styled.div`
  background-color: #313131;
  border-radius: 15px;
  height: 75%;
  margin: 0 4%;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto auto;
`

export const StyledText = styled.p<{weight: string, margin: string}>`
  font-weight: ${props => props.weight || "normal"};
  margin: ${props => props.margin || "0 0 0 0"};
`

export const Image = styled.img`
  width:40%;
  height: auto;
  margin: auto;
  padding-top: 15px;
  padding-bottom: 15px;
`

export const GlobalStyle = createGlobalStyle`
  body {
    background: #525252;
  }
`