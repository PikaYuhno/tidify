import React from 'react';
// @ts-ignore
import {Main, Image, StyledText, Inputs, InputBox, TempInputBox, AvatarBox, UploadAv, OutBox} from './styles.ts';
import white from './white.png';

class Register extends React.Component {
    render() {
        return (
            <>
                <Main>
                    <Image src={white}/>
                    <StyledText weight={"bold"} margin={"0 0 -5px 7%"}>register.</StyledText>
                    <Inputs>
                        <form>
                        <StyledText margin={"0 0 -7px 5%"} >first name.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <TempInputBox></TempInputBox>
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >last name.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <TempInputBox></TempInputBox>
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >username.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <TempInputBox></TempInputBox>
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >e-mail.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <TempInputBox></TempInputBox>
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >password.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <TempInputBox></TempInputBox>
                        </InputBox>
                        </form>
                        <OutBox>
                            <AvatarBox><img/></AvatarBox>
                            <UploadAv>
                                <StyledText>
                                    upload avatar. (optional)
                                </StyledText>
                                <button>choose file</button>
                            </UploadAv>
                        </OutBox>


                    </Inputs>
                </Main>
            </>

        );
    }
}

export default Register;
