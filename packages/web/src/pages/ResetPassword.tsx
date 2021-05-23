import React from 'react';
import {Formik, Field, Form} from 'formik';
import {RouteComponentProps} from 'react-router-dom';

interface MatchParams {
    token: string;
}

interface ResetPasswordProps extends RouteComponentProps<MatchParams> {}

class ResetPassword extends React.Component<ResetPasswordProps> {

    render() {
        const {match} = this.props;
        return (
            <Formik
                initialValues={{newPassword: '', confirmPassword: '', token: ''}}
                onSubmit={async (values, {setSubmitting}) => {
                    setSubmitting(true);
                    if (values.newPassword !== values.confirmPassword) {
                        return;
                    };
                    const body = {newPassword: values.newPassword, token: match.params.token};
                    const res = await fetch(`/api/v1/auth/reset/password/`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    });
                    const json = await res.json();
                    console.log(json);
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="password" name="newPassword" placeholder="new password" />
                        <Field type="password" name="confirmPassword" placeholder="repeat password" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                       </button>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default ResetPassword;
