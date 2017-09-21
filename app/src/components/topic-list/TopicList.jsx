import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';

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