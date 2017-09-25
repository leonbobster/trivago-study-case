import express from 'express';
import bodyParser from 'body-parser';
import Papa from 'papaparse';

// graphql
import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';
import typeDefs from './src/schema';
import buildResolvers from './src/resolvers';

import ReviewService from './src/service/ReviewService';
import TopicService from './src/service/TopicService';

// sqlite3
import sqlite3Module from 'sqlite3';
const sqlite3 = sqlite3Module.verbose();
const db = new sqlite3.Database(
    './db/trivago.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err)
            throw err;
        console.log('Connected to Trivago dababase.');
    }
);

const reviewService = new ReviewService(db);
const topicService = new TopicService(db);

const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(typeDefs),
    rootValue: buildResolvers(db),
    graphiql: true
}));

app.post('/upload-topics', (req, res) => {
    const parsed = Papa.parse(req.body.data);
    if (parsed.errors.length > 0) {
        return res.status(500).send(parsed.errors);
    }
    const data = parsed.data.map(row => {
        return {
            topic: row.shift(),
            alternateNames: JSON.stringify(row)
        };
    });
    topicService.createAll(data)
        .then(() => res.send('Topics have been uploaded!'))
        .catch(err => res.status(500).send(err));
});

app.post('/upload-reviews', (req, res) => {
    const parsed = Papa.parse(req.body.data);
    if (parsed.errors.length > 0) {
        res.status(500).send(parsed.errors); return;
    }
    const data = parsed.data.map(row => {
        return { text: row[0] };
    });
    reviewService.createAll(data)
        .then(() => res.send('Reviews have been uploaded!'))
        .catch(err => res.status(500).send(err));
});

process.on('SIGTERM', () => {
    db.close(err => {
        if (err)
            throw err;
        console.log('Close the database connection.');
    });
});

app.listen(8080, () => console.log('App listening on port 8080!'));