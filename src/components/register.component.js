import React, {Component} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserDataService from "../services/user.service";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        console.log(JSON.stringify(data, null, 2));

        UserDataService.create(data)
            .catch(e => {
                console.log(e);
            });
        this.props.history.push('/login')
    }

    validationSchema() {
        return Yup.object().shape({
            username: Yup.string()
                .required('Username is required')
                .min(6, 'Username must be at least 6 characters')
                .max(20, 'Username must not exceed 20 characters'),
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters')
                .max(40, 'Password must not exceed 40 characters'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
            role: Yup.string()
                .required('Role is required'),
            acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
        });
    }

    render() {
        const initialValues = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user',
            acceptTerms: false,
        };

        return (
            <div className="register-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {({ resetForm }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username"> Username </label>
                                <Field name="username" type="text" className="form-control" />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email"> Email </label>
                                <Field name="email" type="email" className="form-control" />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password"> Password </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword"> Confirm Password </label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role"> Select role </label>
                                <Field name="role" as="select">
                                    <option value="user">User</option>
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </Field>
                            </div>

                            <div className="form-group form-check">
                                <Field
                                    name="acceptTerms"
                                    type="checkbox"
                                    className="form-check-input"
                                />
                                <label htmlFor="acceptTerms" className="form-check-label">
                                    I have read and agree to the Terms
                                </label>
                                <ErrorMessage
                                    name="acceptTerms"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Register
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn btn-warning float-right"
                                >
                                    Reset
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}