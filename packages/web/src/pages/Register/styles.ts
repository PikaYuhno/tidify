import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';



export const Main = styled.div`
  min-width: 400px;
  width: 30%;
  margin: auto;
  margin-top: 2.5%;
  height: 75vh;
  font-size: 20px;
  color: white;
  border-radius: 15px;
  background-color: #414141;
  min-height: 600px;
`
export const Inputs = styled.div`
  background-color: #313131;
  border-radius: 15px;
  height: 75%;

  margin: 0 4%;
`

export const StyledText = styled.p<{weight: string, margin: string}>`
  font-weight: ${props => props.weight || "normal"};
  margin: ${props => props.margin || "0"};
`

export const Image = styled.img`
  width:40%;
  height: auto;
  margin: auto;
  padding-top: 15px;
  padding-bottom: 15px;
`
export const InputBox = styled.div<{ width: string, margin: string }>`
  border-radius: 15px;
  background-color: white;
  width: ${props => props.width || "100%"};
  margin: ${props => props.margin || "0"};
  color: black;
`

export const GlobalStyle = createGlobalStyle`
  body {
    background: #525252;
  }
`

export const TempInputBox = styled.input`
  margin-left: 4%;
  width:85%;
  &:focus{
    outline: none;
  }
`
export const AvatarBox = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 25%;
  height: auto;
  margin: 5%;
  min-width:150px;
`