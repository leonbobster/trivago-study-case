export default class DataService {
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${this.table}`, [], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}