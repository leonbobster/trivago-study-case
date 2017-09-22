import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { Route } from 'react-router-dom';

export class TopicList extends Component {
    getHtml(data) {
        if (!data || data.error) {
            return <p>Sorry! There was an error loading the topics.</p>;
        }
        if (data.loading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <div className="table">
                    <Route render={({ history }) => (
                        <a style={{ cursor: 'pointer' }}
                            onClick={() => history.push('/upload-topics')}>
                            <span className="glyphicon glyphicon-upload" aria-hidden="true"></span> Upload CSV File</a>
                    )} />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Topic</td>
                            <td>Alternate Names</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.topics.map(topic => (
                            <tr key={topic.topic}>
                                <td>{topic.topic}</td>
                                <td>{topic.alternateNames.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return <div id="topic-list">{this.getHtml(this.props.data)}</div>;
    }
};

export default graphql(gql`{ topics { topic alternateNames } }`)(TopicList);