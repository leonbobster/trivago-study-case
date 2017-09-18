import React, { Component } from 'react';
import { connect } from 'react-redux';

import { reviewsFetchData } from './../../actions/reviews';
import Button from './../../components/button/button';

class ReviewList extends Component {
    componentDidMount() {
        this.props.fetchData('http://localhost/api/reviews');
    }

    render() {
        if (this.props.error) {
            return <p>Sorry! There was an error loading the scores.</p>;
        }
        if (this.props.loading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <table id="review-list" className="table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Text</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map((review) => (
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
}

const mapStateToProps = (state) => {
    return {
        items: state.reviewsFetchDataSuccess,
        error: state.reviewsFetchDataErrors,
        loading: state.reviewsFetchDataLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(reviewsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);