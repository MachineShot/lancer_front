import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class Employee extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getEmployee = this.getEmployee.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);

        this.state = {
            currentEmployee: {
                id: null,
                firstName: "",
                lastName: "",
                description: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getEmployee(this.props.match.params.id);
        console.log(this.props.match.params.id);
    }

    onChangeFirstName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentEmployee: {
                    ...prevState.currentEmployee,
                    firstName: name
                }
            };
        });
    }

    onChangeLastName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentEmployee: {
                    ...prevState.currentEmployee,
                    lastName: name
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(function(prevState) {
            return {
                currentEmployee: {
                    ...prevState.currentEmployee,
                    description: description
                }
            };
        });
    }

    getEmployee(id) {
        EmployeeDataService.get(id)
            .then(response => {
                this.setState({
                    currentEmployee: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateDescription(status) {
        var data = {
            id: this.state.currentEmployee.id,
            firstName: this.state.currentEmployee.firstName,
            lastName: this.state.currentEmployee.lastName,
            description: this.state.currentEmployee.description
        };

        EmployeeDataService.update(this.state.currentEmployee.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentEmployee: {
                        ...prevState.currentEmployee,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateEmployee() {
        EmployeeDataService.update(
            this.state.currentEmployee.id,
            this.state.currentEmployee
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The employee was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteEmployee() {
        EmployeeDataService.delete(this.state.currentEmployee.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/employees')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentEmployee } = this.state;

        return (
            <div>
                {currentEmployee ? (
                    <div className="edit-form">
                        <h4>Employee</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={currentEmployee.firstName}
                                    onChange={this.onChangeFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={currentEmployee.lastName}
                                    onChange={this.onChangeLastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentEmployee.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                        </form>

                        <button
                            className="btn btn-danger"
                            onClick={this.deleteEmployee}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={this.updateEmployee}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an Employee...</p>
                    </div>
                )}
            </div>
        );
    }
}