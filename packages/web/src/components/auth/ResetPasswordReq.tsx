import React from 'react';
import {Formik, Field, Form} from 'formik';

class ResetPasswordReq extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{email: ''}}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true);
                    const res = await fetch(`/api/v1/auth/reset/password/new`, {
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
                        <Field type="email" name="email" placeholder="email" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                       </button>
                       <div className="container"></div>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default ResetPasswordReq;
