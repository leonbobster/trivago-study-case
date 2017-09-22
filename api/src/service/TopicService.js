import DataService from './DataService';

export default class TopicService extends DataService {
    constructor(db) {
        super(db, 'topics');
    }

    getAll() {
        return super.getAll()
            .then(rows => rows.map(row => {
                row.alternateNames = JSON.parse(row.alternateNames);
                return row;
            }));
    }
}