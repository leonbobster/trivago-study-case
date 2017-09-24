import DataService from './DataService';

export default class ReviewService extends DataService {
    constructor(db) {
        super(db, 'reviews');
    }

    create({ text }) {
        if (!text) {
            return new Promise((resolve, reject) => reject('Text is required.'));
        }
        return super.create({ text });
    }
}