import React, { Component } from "react";
import RatingDataService from "../services/rating.service";
import { Link } from "react-router-dom";

export default class RatingsList extends Component {
    constructor(props) {
        super(props);
        this.retrieveRatings = this.retrieveRatings.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveRating = this.setActiveRating.bind(this);

        this.state = {
            ratings: [],
            currentRating: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveRatings();
    }

    retrieveRatings() {
        RatingDataService.getAll()
            .then(response => {
                this.setState({
                    ratings: response.data._embedded.ratings
                });
                console.log(response.data._embedded.ratings);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveRatings();
        this.setState({
            currentRating: null,
            currentIndex: -1
        });
    }

    setActiveRating(rating, index) {
        this.setState({
            currentRating: rating,
            currentIndex: index
        });
    }

    render() {
        const { ratings, currentRating, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Ratings List</h4>

                    <ul className="list-group">
                        {ratings &&
                        ratings.map((rating, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveRating(rating, index)}
                                key={index}
                            >
                                {rating.comment}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <Link
                            to={"/addRating"}
                            className="btn btn-outline-secondary"
                        >
                            Add Rating
                        </Link>
                    </div>
                </div>
                <div className="col-md-6">
                    {currentRating ?
                        <div>
                            <h4>Rating</h4>
                            <div>
                                <label>
                                    <strong>Comment:</strong>
                                </label>{" "}
                                {currentRating.comment}
                            </div>
                            <div>
                                <label>
                                    <strong>Stars:</strong>
                                </label>{" "}
                                {currentRating.stars}
                            </div>

                            <Link
                                to={"/ratings/" + currentRating.id}
                                className="btn btn-outline-secondary"
                            >
                                Edit Rating
                            </Link>
                        </div>
                    :
                        <div>
                            <br />
                            <p>Please click on an Rating...</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
