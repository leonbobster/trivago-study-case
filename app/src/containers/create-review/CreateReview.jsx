import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createReview } from './../../actions/reviews';

class CreateReview extends Component {
    constructor() {
        super();
        this.state = { text: '' };
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(event) {
        this.setState({ text: event.target.value });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>Review Text</label>
                    <textarea
                        onChange={this.onTextChange}
                        id="review-text"
                        rows="8"
                        className="form-control"></textarea>
                </div>
                <button
                    onClick={() => this.props.createReview(this.state.text)}
                    type="submit"
                    className="btn btn-primary">Save</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createReview: (text) => dispatch(createReview(text))
    };
};

export default connect(state => { return {}; }, mapDispatchToProps)(CreateReview);