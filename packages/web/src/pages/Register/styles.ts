import styled from 'styled-components';

export const Main = styled.div`
  min-width: 300px;
  width: 30%;
  margin: auto;
  margin-top: 2.5%;
  height: 75vh;
  font-size: 20px;
  color: white;
  border-radius: 15px;
  background-color: var(--primary);
  min-height: 500px;
  
`
export const Inputs = styled.div`
  background-color: var(--secondary);
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



export const TempInputBox = styled.input`
  margin-left: 4%;
  width:85%;
  &:focus{
    outline: none;
  }
`
export const OutBox = styled.div`
  display: flex;
  background-color: var(--primary);
  border-radius: 15px;
  margin: 10% 2%;
  padding: 4px 0;
`

export const UploadAv = styled.div`
  
  
  display: flex;
  flex-direction: column;
  > button{
    background-color: var(--white);
    color: var(--black);
    height: 15%;
    width: 40%;
    font-size: small;
    padding: 1%;
    border-radius: 15px;
    font-weight: bold;
    min-width: 85px;
    &:focus{
      outline: none;
    }
  }
  > StyledText{
    height: 5vh;
  }
`

export const AvatarBox = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 5%;
  min-width:150px;
`