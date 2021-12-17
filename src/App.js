import React, {Component} from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Employee from "./components/employee.component";
import EmployeesList from "./components/employees-list.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Query from "./components/query.component";
import AddEmployee from "./components/add-employee.component";
import AddQuery from "./components/add-query.component";
import Rating from "./components/rating.component";
import RatingsList from "./components/ratings-list.component";

// https://www.javaguides.net/2020/07/react-js-fetch-api-to-consume-spring.html
// https://www.bezkoder.com/react-crud-web-api/

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">
                        Lancer
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/employees"} className="nav-link">
                                Employees
                            </Link>
                        </li>
                    </div>
                </nav>

                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <h3>Gerardas Kiuberis IFK-9</h3>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/employees"]} component={EmployeesList} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/employees" component={EmployeesList} />
                        <Route path="/employee/:id" component={Employee} />
                        <Route path="/addQuery/:id" component={AddQuery} />
                        <Route path="/ratings/:id" component={Rating} />
                        <Route path="/employeeRatings/:id" component={RatingsList} />
                        <Route path="/addEmployee" component={AddEmployee} />
                        <Route path="/queries/:id" component={Query} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;

