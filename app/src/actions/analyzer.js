import { get } from './data-service';

export function analyzerFetchDataError(bool) {
    return {
        type: 'ANALYZER_FETCH_DATA_ERROR',
        error: bool
    };
};

export function analyzerFetchDataLoading(bool) {
    return {
        type: 'ANALYZER_FETCH_DATA_LOADING',
        loading: bool
    };
};

export function analyzerFetchDataSuccess(items) {
    return {
        type: 'ANALYZER_FETCH_DATA_SUCCESS',
        items
    };
};

export function analyzerFetchData(url) {
    return get(
        url,
        analyzerFetchDataSuccess,
        analyzerFetchDataLoading,
        analyzerFetchDataError
    );
};