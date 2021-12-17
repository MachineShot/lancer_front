import React, { Component } from "react";
import QueryDataService from "../services/query.service";

export default class Query extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getQuery = this.getQuery.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.deleteQuery = this.deleteQuery.bind(this);

        this.state = {
            currentQuery: {
                id: null,
                title: "",
                description: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getQuery(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentQuery: {
                    ...prevState.currentQuery,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(function(prevState) {
            return {
                currentQuery: {
                    ...prevState.currentQuery,
                    description: description
                }
            };
        });
    }

    getQuery(id) {
        QueryDataService.get(id)
            .then(response => {
                this.setState({
                    currentQuery: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateQuery() {
        QueryDataService.update(
            this.state.currentQuery.id,
            this.state.currentQuery
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The query was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteQuery() {
        QueryDataService.delete(this.state.currentQuery.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/employees')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentQuery } = this.state;

        return (
            <div>
                {currentQuery ? (
                    <div className="edit-form">
                        <h4>Query</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentQuery.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentQuery.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                        </form>

                        <button
                            className="btn btn-danger"
                            onClick={this.deleteQuery}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={this.updateQuery}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an Query...</p>
                    </div>
                )}
            </div>
        );
    }
}