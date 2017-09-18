export function reviewsFetchDataError(state = false, action) {
    switch (action.type) {
        case 'REVIEWS_FETCH_DATA_ERROR':
            return action.error;
        default:
            return state;
    }
};

export function reviewsFetchDataLoading(state = false, action) {
    switch (action.type) {
        case 'REVIEWS_FETCH_DATA_LOADING':
            return action.loading;
        default:
            return state;
    }
};

export function reviewsFetchDataSuccess(state = [], action) {
    switch (action.type) {
        case 'REVIEWS_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
};