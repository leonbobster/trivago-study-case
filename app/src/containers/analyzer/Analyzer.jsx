import React, { Component } from 'react';
import { connect } from 'react-redux';
import { analyzerFetchData } from './../../actions/analyzer';

class Analyzer extends Component {
    componentWillMount() {
        this.props.fetchData('http://localhost/api/scores');
    }

    render() {
        if (this.props.error) {
            return <p>Sorry! There was an error loading the scores.</p>;
        }
        if (this.props.loading) {
            return <p>Loading...</p>;
        }
        return (
            <table id="analyzer" className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Review</td>
                        <td>Topics</td>
                        <td>Score</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((score) => (
                        <tr key={score.id}>
                            <td>{score.id}</td>
                            <td>{score.review}</td>
                            <td>{score.topics.join(', ')}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.analyzerFetchDataSuccess,
        error: state.analyzerFetchDataError,
        loading: state.analyzerFetchDataLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(analyzerFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analyzer);