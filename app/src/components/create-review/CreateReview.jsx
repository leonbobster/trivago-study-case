import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { createHashHistory } from 'history';

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
                    onClick={() => {
                        this.props.mutate({
                            variables: { text: this.state.text }
                        })
                            .then(() => {
                                createHashHistory().push('/review-list');
                                window.location.reload();
                            })
                            .catch(err => alert(err));

                    }}
                    type="submit"
                    className="btn btn-primary">Save</button>
            </form>
        );
    }
}

const mutation = gql`
    mutation createReview($text: String!) {
        createReview(text: $text) { id }
    }
`;

export default graphql(mutation)(CreateReview);