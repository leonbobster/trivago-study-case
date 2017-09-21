import express from 'express';
import bodyParser from 'body-parser';
import ReviewService from './src/service/review-service';
import { analyze } from './src/analyzer/analyzer';
import { negatives, positives, topics } from './src/service/data';
import { buildSchema } from 'graphql';

// graphql
import graphqlHTTP from 'express-graphql';
import typeDefs from './src/schema';

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

const app = express();
const reviewService = new ReviewService(db);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const resolvers = {
    reviews: () => reviewService.getAll(),
    scores: () => {
        const analyzeReview = review => analyze(review, topics, positives, negatives);
        return reviewService.getAll()
            .then(rows => {
                return rows.map(review => {
                    const { score, foundPhrases } = analyzeReview(review.text);
                    return {
                        id: review.id,
                        score,
                        review: review.text,
                        topics: Object.keys(foundPhrases).map(k => `${k} ${foundPhrases[k] < 0 ? '-1' : '+1'}`)
                    };
                });
            });
    },
    topics,
    createReview: ({ text }) => {
        const stmt = db.prepare(`INSERT INTO reviews(text) VALUES (?)`, [text])
            .run(err => {
                if (err)
                    throw err;
                return { id: stmt.lastID, text };
            });
    }
};

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(typeDefs),
    rootValue: resolvers,
    graphiql: true
}));

process.on('SIGTERM', () => {
    db.close(err => {
        if (err)
            throw err;
        console.log('Close the database connection.');
    });
});

app.listen(8080, () => console.log('App listening on port 8080!'));