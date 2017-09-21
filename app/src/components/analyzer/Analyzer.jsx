import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';

export class Analyzer extends Component {
    getHtml(data) {
        if (!data || data.error) {
            return <p>Sorry! There was an error loading the scores.</p>;
        }
        if (data.loading) {
            return <p>Loading...</p>;
        }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Review</td>
                        <td>Topics</td>
                        <td>Score</td>
                    </tr>
                </thead>
                <tbody>
                    {data.scores.map(score => (
                        <tr key={score.id}>
                            <td>{score.id}</td>
                            <td className="col-md-7">{score.review}</td>
                            <td>{score.topics.map(t => <p key={Math.random()}>{t}</p>)}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        return <div id="analyzer">{this.getHtml(this.props.data)}</div>;
    }
}

export default graphql(gql`{ scores { id score review topics } }`)(Analyzer);