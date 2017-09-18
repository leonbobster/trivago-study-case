import {
    analyzerFetchDataError,
    analyzerFetchDataLoading,
    analyzerFetchDataSuccess
} from './analyzer';

describe('analyze reducers', () => {
    it('handles ANALYZER_FETCH_DATA_ERROR message', () => {
        const action = {
            type: 'ANALYZER_FETCH_DATA_ERROR',
            error: true
        };
        const newState = analyzerFetchDataError(false, action);
        expect(newState).toEqual(true);
    });

    it('handles ANALYZER_FETCH_DATA_LOADING message', () => {
        const action = {
            type: 'ANALYZER_FETCH_DATA_LOADING',
            loading: true
        };
        const newState = analyzerFetchDataLoading(false, action);
        expect(newState).toEqual(true);
    });

    it('handles ANALYZER_FETCH_DATA_SUCCESS message', () => {
        const action = {
            type: 'ANALYZER_FETCH_DATA_SUCCESS',
            items: ['foo', 'bar']
        };
        const newState = analyzerFetchDataSuccess([], action);
        expect(newState).toEqual(['foo', 'bar']);
    });
});