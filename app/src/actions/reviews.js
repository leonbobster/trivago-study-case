import { get } from './data-service';
import { createHashHistory } from 'history';

export function reviewsFetchDataError(bool) {
    return {
        type: 'REVIEWS_FETCH_DATA_ERROR',
        error: bool
    };
};

export function reviewsFetchDataLoading(bool) {
    return {
        type: 'REVIEWS_FETCH_DATA_LOADING',
        loading: bool
    };
};

export function reviewsFetchDataSuccess(items) {
    return {
        type: 'REVIEWS_FETCH_DATA_SUCCESS',
        items
    };
};

export function reviewsFetchData(url) {
    return get(
        url,
        reviewsFetchDataSuccess,
        reviewsFetchDataLoading,
        reviewsFetchDataError
    );
};

export function createReview(text) {
    return (dispatch) => {
        fetch('http://localhost/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `text=${text}`
        })
            .then(() => createHashHistory().push('/review-list'));
    };
};