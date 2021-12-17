import React, { Component } from "react";
import RatingDataService from "../services/rating.service";

export default class Rating extends Component {
    constructor(props) {
        super(props);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeStars = this.onChangeStars.bind(this);
        this.getRating = this.getRating.bind(this);
        this.updateRating = this.updateRating.bind(this);
        this.deleteRating = this.deleteRating.bind(this);

        this.state = {
            currentRating: {
                id: null,
                comment: "",
                stars: -1
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getRating(this.props.match.params.id);
    }

    onChangeComment(e) {
        const comment = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRating: {
                    ...prevState.currentRating,
                    comment: comment
                }
            };
        });
    }

    onChangeStars(e) {
        const stars = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRating: {
                    ...prevState.currentRating,
                    stars: stars
                }
            };
        });
    }

    getRating(id) {
        RatingDataService.get(id)
            .then(response => {
                this.setState({
                    currentRating: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateRating() {
        RatingDataService.update(
            this.state.currentRating.id,
            this.state.currentRating
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The rating was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteRating() {
        RatingDataService.delete(this.state.currentRating.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/employees/')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentRating } = this.state;

        return (
            <div>
                {currentRating ? (
                    <div className="edit-form">
                        <h4>Rating</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="comment"
                                    value={currentRating.comment}
                                    onChange={this.onChangeComment}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="stars">Stars</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="stars"
                                    value={currentRating.stars}
                                    onChange={this.onChangeStars}
                                />
                            </div>
                        </form>

                        <button
                            className="btn btn-danger"
                            onClick={this.deleteRating}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="btn btn-warning"
                            onClick={this.updateRating}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an Rating...</p>
                    </div>
                )}
            </div>
        );
    }
}