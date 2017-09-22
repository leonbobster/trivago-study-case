import DataService from './DataService';

export default class ReviewService extends DataService {
    constructor(db) {
        super(db, 'reviews');
    }
}