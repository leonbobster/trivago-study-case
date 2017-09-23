import DataService from './DataService';

export default class ReviewService extends DataService {
    constructor(db) {
        super(db, 'reviews');
    }

    create({ text }) {
        if (!text) {
            reject('Text is required'); return;
        }
        return super.create({ text });
    }
}