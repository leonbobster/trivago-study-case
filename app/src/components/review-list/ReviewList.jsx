import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Route } from 'react-router-dom';

import DeleteReview from './../DeleteReview.jsx';

export class ReviewList extends Component {
    getHtml(data) {
        if (!data || data.error) {
            return <p>Sorry! There was an error loading the reviews.</p>;
        }
        if (data.loading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <div className="table">
                    <Route render={({ history }) => (
                        <a style={{ cursor: 'pointer' }}
                            onClick={() => history.push('/upload-reviews')}>
                            <span className="glyphicon glyphicon-upload" aria-hidden="true"></span> Upload CSV File</a>
                    )} />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Text</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.reviews.map(review => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.text}</td>
                                <td><DeleteReview id={review.id} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2">
                                <Route render={({ history }) => (
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => history.push('/create-review')}>
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Review
                                        </a>
                                )} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return <div id="review-list">{this.getHtml(this.props.data)}</div>;
    }
}

export default graphql(gql`{ reviews { id text } }`)(ReviewList);