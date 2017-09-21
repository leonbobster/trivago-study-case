import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import Button from './../button/button';

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
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button label="Create Review" url="/create-review" />
            </div>
        );
    }

    render() {
        return <div id="review-list">{this.getHtml(this.props.data)}</div>;
    }
}

export default graphql(gql`{ reviews { id text } }`)(ReviewList);