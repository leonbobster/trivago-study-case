const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
    './db/trivago.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err)
            throw err;
        console.log('Connected to Trivago dababase.');
    }
);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/reviews', (req, res) => {
    db.all(`SELECT * FROM reviews`, [], (err, rows) => {
        if (err)
            throw err;
        res.json(rows);
    });
});

app.post('/reviews', (req, res) => {
    const stmt = db.prepare(`INSERT INTO reviews(text) VALUES (?)`, [req.body.text])
        .run(err => {
            if (err)
                throw err;
            const id = stmt.lastID;
            res.json({ id });
            console.log(`A row has been inserted with id ${id}`);
        });
});

app.get('/scores', (req, res) => {
    res.json([
        {
            id: 1,
            review: 'foobar',
            topics: [
                'bar',
                'bat',
                'foo'
            ],
            score: 2
        },
        {
            id: 2,
            review: 'foobar',
            topics: [
                'bar',
                'bat',
                'foo'
            ],
            score: 2
        },
        {
            id: 3,
            review: 'foobar',
            topics: [
                'bar',
                'bat',
                'foo'
            ],
            score: 2
        },
        {
            id: 4,
            review: 'foobar',
            topics: [
                'bar',
                'bat',
                'foo'
            ],
            score: 2
        },
        {
            id: 5,
            review: 'foobar',
            topics: [
                'bar',
                'bat',
                'foo'
            ],
            score: 2
        }
    ]);
});

process.on('SIGTERM', () => {
    db.close(err => {
        if (err)
            throw err;
        console.log('Close the database connection.');
    });
});

app.listen(8080, () => console.log('App listening on port 8080!'));