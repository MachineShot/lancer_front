import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import QueryDataService from "../services/query.service";
import { Link } from "react-router-dom";
import Modal from './modal.js';

export default class EmployeesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveEmployee = this.setActiveEmployee.bind(this);
        this.setActiveQuery = this.setActiveQuery.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.state = {
            employees: [],
            employeeQueries: [],
            currentEmployee: null,
            currentQuery: null,
            show: false,
            currentIndex: -1,
            currentQueryIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveEmployees();
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    retrieveEmployees() {
        EmployeeDataService.getAll()
            .then(response => {
                this.setState({
                    employees: response.data._embedded.employees
                });
                console.log(response.data._embedded.employees);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveEmployeeQueries(employee) {
        QueryDataService.getByEmployee(employee)
            .then(response => {
                this.setState({
                    employeeQueries: response.data._embedded.queries
                });
                console.log(response.data._embedded.queries);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveEmployees();
        this.setState({
            currentEmployee: null,
            currentIndex: -1
        });
    }

    setActiveEmployee(employee, index) {
        this.retrieveEmployeeQueries(employee.id);
        this.setState({
            currentQuery: null,
            currentQueryIndex: -1,
            currentEmployee: employee,
            currentIndex: index
        });
    }

    setActiveQuery(query, index) {
        this.setState({
            currentQuery: query,
            currentQueryIndex: index,
            show: true
        });
    }

    render() {
        const { employees, employeeQueries, currentEmployee, currentQuery, currentQueryIndex, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Employees List</h4>

                    <ul className="list-group">
                        {employees &&
                        employees.map((employee, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveEmployee(employee, index)}
                                key={index}
                            >
                                {employee.firstName}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <Link
                            to={"/addEmployee"}
                            className="btn btn-outline-secondary"
                        >
                            Add Employee
                        </Link>
                    </div>
                </div>
                <div className="col-md-6">
                    {currentEmployee ?
                        <div>
                            <h4>Employee</h4>
                            <div>
                                <label>
                                    <strong>First name:</strong>
                                </label>{" "}
                                {currentEmployee.firstName}
                            </div>
                            <div>
                                <label>
                                    <strong>Last Name:</strong>
                                </label>{" "}
                                {currentEmployee.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentEmployee.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Queries:</strong>
                                </label>{" "}

                                <ul className="list-group">
                                    {employeeQueries &&
                                    employeeQueries.map((query, index) => (
                                        <li
                                            className={
                                                "list-group-item margin-xs " +
                                                (index === currentQueryIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveQuery(query, index)}
                                            key={index}
                                        >
                                            {query.title}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to={"/addQuery/" + currentEmployee.id}
                                    className="btn btn-outline-secondary"
                                >
                                    Add Query
                                </Link>
                            </div>

                            {currentQuery ?
                                <div>
                                    <Modal show={this.state.show} handleClose={this.hideModal}>
                                        <ul>
                                            <li>
                                                Title: {currentQuery.title}
                                            </li>
                                            <li>
                                                Description: {currentQuery.description}
                                            </li>
                                        </ul>
                                        <Link
                                            to={"/queries/" + currentQuery.id}
                                            className="btn btn-outline-secondary"
                                        >
                                            Edit Query
                                        </Link>
                                    </Modal>
                                </div>

                            :
                                <div>
                                </div>
                            }

                            <Link
                                to={"/employee/" + currentEmployee.id}
                                className="btn btn-outline-secondary"
                            >
                                Edit Employee
                            </Link>
                            <Link
                                to={"/employeeRatings/" + currentEmployee.id}
                                className="btn btn-outline-secondary"
                            >
                                See ratings
                            </Link>
                        </div>
                    :
                        <div>
                            <br />
                            <p>Please click on an Employee...</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
