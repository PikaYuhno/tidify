import React from 'react';
import {Formik, Field, Form} from 'formik';


class ConfirmCode extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{code: ''}}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true);
                    const res = await fetch(`/api/v1/auth/confirm`, {
                        method: 'PUT',
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
                        <Field type="text" name="code" placeholder="code"/>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                       </button>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default ConfirmCode;
