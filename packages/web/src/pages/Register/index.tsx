import React from 'react';
// @ts-ignore
import {Main, Image, StyledText, Inputs, InputBox, TempInputBox, AvatarBox, UploadAv, OutBox} from './styles.ts';
import white from './white.png';
import {Formik, Form, Field} from 'formik';

class Register extends React.Component {
    render() {
        return (
            <>
                <Main>
                    <Image src={white}/>
                    <StyledText weight={"bold"} margin={"0 0 -5px 7%"}>register.</StyledText>
                    <Inputs>
                        <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            username: '',
                            email: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                        >{(props) => (
                        <Form>
                        <StyledText margin={"0 0 -7px 5%"} >first name.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <Field name="firstName" as={TempInputBox} />
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >last name.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <Field name="lastName" as={TempInputBox} />
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >username.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <Field name="username" as={TempInputBox} />
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >e-mail.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <Field name="email" as={TempInputBox} />
                        </InputBox>
                        <StyledText margin={"0 0 -7px 5%"} >password.</StyledText>
                        <InputBox width={"95%"} margin={"0 2.5%"}>
                            <Field name="password" as={TempInputBox} />
                        </InputBox>
                        </Form>
                        )}</Formik>
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
