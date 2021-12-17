import React, { Component } from "react";
import RatingDataService from "../services/rating.service";

export default class AddRating extends Component {
    constructor(props) {
        super(props);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeStars = this.onChangeStars.bind(this);
        this.saveRating = this.saveRating.bind(this);
        this.newRating = this.newRating.bind(this);

        this.state = {
            id: null,
            comment: "",
            stars: "",

            submitted: false
        };
    }

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    onChangeStars(e) {
        this.setState({
            stars: e.target.value
        });
    }

    saveRating() {
        var data = {
            comment: this.state.comment,
            stars: this.state.stars,
            fk_Employeeid: this.props.match.params.id
        };

        RatingDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    comment: response.data.comment,
                    stars: response.data.stars,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newRating() {
        this.setState({
            id: null,
            comment: "",
            stars: "",
            fk_Employeeid: this.props.match.params.id,

            submitted: false
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newRating}>
                            Add more
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="comment">Comment</label>
                            <input
                                type="text"
                                className="form-control"
                                id="comment"
                                required
                                value={this.state.comment}
                                onChange={this.onChangeComment}
                                name="comment"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="stars">Stars</label>
                            <input
                                type="text"
                                className="form-control"
                                id="stars"
                                required
                                value={this.state.stars}
                                onChange={this.onChangeStars}
                                name="stars"
                            />
                        </div>

                        <button onClick={this.saveRating} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
