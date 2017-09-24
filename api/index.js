import express from 'express';
import bodyParser from 'body-parser';
import Papa from 'papaparse';

// graphql
import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';
import typeDefs from './src/schema';
import buildResolvers from './src/resolvers';

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
        res.status(500).json(parsed.errors); return;
    }
    parsed.data.forEach(row => {
        db.prepare(`INSERT INTO topics(topic, alternateNames) VALUES (?, ?)`, [
            row.shift(),
            JSON.stringify(row)
        ])
            .run(err => {
                if (err)
                    console.log(err);
            });
    });
    res.send();
});

app.post('/upload-reviews', (req, res) => {
    const parsed = Papa.parse(req.body.data);
    if (parsed.errors.length > 0) {
        res.status(500).json(parsed.errors); return;
    }

    const query = 'INSERT INTO reviews(text) VALUES ';
    const values = [];
    const params = [];
    parsed.data.forEach(row => {
        values.push('(?)');
        params.push(row[0]);
    });

    db.prepare(query + values.join(','), params)
        .run(err => {
            if (err) {
                res.status(500).send(err); return;
            }
            res.send('File has been uploaded');
        });
});

process.on('SIGTERM', () => {
    db.close(err => {
        if (err)
            throw err;
        console.log('Close the database connection.');
    });
});

app.listen(8080, () => console.log('App listening on port 8080!'));