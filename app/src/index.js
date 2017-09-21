import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost/api/graphql',
    }),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();
