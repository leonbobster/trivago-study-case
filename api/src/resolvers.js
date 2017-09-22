import ReviewService from './service/ReviewService';
import TopicService from './service/TopicService';
import { analyze } from './analyzer/analyzer';
import { negatives, positives } from './service/data';

const buildResolvers = (db) => {
    const reviewService = new ReviewService(db);
    const topicService = new TopicService(db);
    return {
        reviews: () => reviewService.getAll(),
        scores: () => {
            return reviewService.getAll().then(reviews => {
                return topicService.getAll().then(topics => {
                    const analyzeReview = review => analyze(review, topics, positives, negatives);
                    return reviews.map(review => {
                        const { score, foundPhrases } = analyzeReview(review.text);
                        return {
                            id: review.id,
                            score,
                            review: review.text,
                            topics: Object.keys(foundPhrases).map(k => `${k} ${foundPhrases[k] < 0 ? '-1' : '+1'}`)
                        };
                    });
                });
            });
        },
        topics: () => topicService.getAll(),
        createReview: ({ text }) => {
            return new Promise((resolve, reject) => {
                if (!text) {
                    reject('Text is required'); return;
                }
                const stmt = db.prepare(`INSERT INTO reviews(text) VALUES (?)`, [text])
                    .run(err => {
                        if (err) {
                            reject(err); return;
                        }
                        resolve({ id: stmt.lastID, text });
                    });
            });
        },
        deleteReview: ({ id }) => {
            return new Promise((resolve, reject) => {
                db.run('DELETE FROM reviews WHERE id = ?', [id], err => {
                    if (err) {
                        reject(err); return;
                    }
                    resolve({ id });
                });
            });
        }
    }
};

export default buildResolvers;