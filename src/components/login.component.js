import React, {Component} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserDataService from "../services/user.service";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        console.log(JSON.stringify(data, null, 2));

        UserDataService.login(data)
            .catch(e => {
                console.log(e);
            });
        this.props.history.push('/')
    }

    validationSchema() {
        return Yup.object().shape({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .required('Password is required'),
        });
    }

    render() {
        const initialValues = {
            username: '',
            password: '',
        };

        return (
            <div className="login-form">
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
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
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