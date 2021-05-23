import React from 'react';
import {Formik, Field, Form} from 'formik';
import RestPasswordReq from '../components/auth/ResetPasswordReq';

type LoginState = {
    forgotPW: boolean;
}
class Login extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            forgotPW: false,
        }
    }


    render() {
        return (
            <>
            {!this.state.forgotPW && <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true);
                    const res = await fetch(`/api/v1/auth/login`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values)
                    });
                    const json = await res.json();
                    console.log(json);
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="email" name="email" />
                        <Field type="password" name="password" />
                        <button onClick={() => this.setState({forgotPW: true})} >Forgot Password</button>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                       </button>
                    </Form>
                )}
            </Formik>}
            {this.state.forgotPW && <RestPasswordReq />}
            </>
        );
    }
}

export default Login;
