import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Route } from 'react-router-dom';

class DeleteReview extends Component {
    render() {
        return (
            <Route render={() => (
                <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        this.props.mutate({
                            refetchQueries: [{
                                query: gql`{ reviews { id text } }`
                            }],
                            variables: { id: this.props.id }
                        });
                    }}>
                    <span
                        className="glyphicon glyphicon-remove"
                        aria-hidden="true"></span>
                </a>
            )} />
        );
    }
}

const mutation = gql`
    mutation deleteReview($id: Int!) {
        deleteReview(id: $id) { id }
    }
`;

export default graphql(mutation)(DeleteReview);