import React from 'react';
// @ts-ignore
import {Main, Image, StyledText, Inputs, InputBox, TempInputBox, AvatarBox, GlobalStyle} from './styles.ts';
import white from './white.png';

class Register extends React.Component {
    render() {
        return (
            <>
                <GlobalStyle/>
                <Main>
                    <Image src={white}/>
                    <StyledText weight={"bold"} margin={"0 0 -5px 7%"}>register.</StyledText>
                    <Inputs>
                        <StyledText margin={"0 0 -7px 5%"} weight={"bold"}>first name.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}><form>
                            <TempInputBox></TempInputBox>
                        </form></InputBox>
                        <StyledText margin={"0 0 -7px 5%"} weight={"bold"}>last name.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}><form>
                            <TempInputBox></TempInputBox>
                        </form></InputBox>
                        <StyledText margin={"0 0 -7px 5%"} weight={"bold"}>username.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}><form>
                            <TempInputBox></TempInputBox>
                        </form></InputBox>
                        <StyledText margin={"0 0 -7px 5%"} weight={"bold"}>e-mail.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}><form>
                            <TempInputBox></TempInputBox>
                        </form></InputBox>
                        <StyledText margin={"0 0 -7px 5%"} weight={"bold"}>password.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}><form>
                            <TempInputBox></TempInputBox>
                        </form></InputBox>
                        <AvatarBox></AvatarBox>
                    </Inputs>
                </Main>
            </>

        );
    }
}

export default Register;
