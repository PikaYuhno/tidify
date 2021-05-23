import React from 'react';
import {Formik, Field, Form} from 'formik';
import ConfirmCode from '../components/auth/ConfirmCode';

type RegisterState = {
    confirmCode: boolean;
}

class Register extends React.Component<{}, RegisterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            confirmCode: false
        }
    }
    render() {
        return (
            <>
                {!this.state.confirmCode && <Formik
                initialValues={{username: '', firstName: '', lastName: '', email: '', password: ''}}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true);
                    const res = await fetch(`/api/v1/auth/register`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values)
                    });
                    const json = await res.json();
                    json.success && this.setState({confirmCode: true});
                    console.log(json);
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="username" placeholder="username" />
                        <Field type="text" name="firstName" placeholder="first name" />
                        <Field type="text" name="lastName" placeholder="last name" />
                        <Field type="email" name="email" placeholder="email" />
                        <Field type="password" name="password" placeholder="password" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                       </button>
                    </Form>
                )}
            </Formik>
                }
                {this.state.confirmCode && <ConfirmCode />}
            </>            
        );
    }
}

export default Register;
