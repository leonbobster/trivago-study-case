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

    delete(id) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${this.table} WHERE id = ?`, [id], err => {
                if (err) {
                    reject(err); return;
                }
                resolve({ id });
            });
        });
    }

    create(resourse) {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(resourse).map(k => k.replace(/[^A-Za-z0-9\_]/g, ''));
            const placeholders = keys.map(k => '?').join(',');
            const stmt = this.db.prepare(`
                INSERT INTO ${this.table}(${keys.join(',')}) VALUES (${placeholders})
            `, keys.map(k => resourse[k]))
                .run(err => {
                    if (err) {
                        reject(err); return;
                    }
                    resolve(Object.assign(resourse, { id: stmt.lastID }));
                });
        });
    }

    /**
     * Create many resourses.
     * 
     * @param {Object[]} resourses 
     */
    createAll(resourses) {
        if (resourses.length === 0) return;

        const keys = Object.keys(resourses[0]).map(k => k.replace(/[^A-Za-z0-9\_]/g, ''));
        const placeholders = keys.map(k => '?').join(',');
        const values = resourses.map(r => `(${placeholders})`).join(',');
        const params = resourses.reduce((x, y) => {
            Object.keys(y).forEach(k => x.push(y[k]));
            return x;
        }, []);

        const query = `INSERT INTO ${this.table}(${keys.join(',')}) VALUES ${values}`;

        return new Promise((resolve, reject) => {
            this.db.prepare(query, params)
                .run(err => {
                    if (err) {
                        reject(err); return;
                    }
                    resolve();
                });
        });
    }
}