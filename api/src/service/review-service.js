class ReviewService {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM reviews`, [], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = ReviewService;