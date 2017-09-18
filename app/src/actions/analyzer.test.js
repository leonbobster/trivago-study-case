import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { analyzerFetchData } from './analyzer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('analyze actions', () => {
    afterAll(() => {
        nock.cleanAll();
    });

    it('should execute fetch data', () => {
        const store = mockStore({});
        nock('http://localhost/api')
            .get('/scores')
            .reply(200, []);

        return store.dispatch(analyzerFetchData('http://localhost/api/scores'))
            .then(() => {
                const actions = store.getActions();
                const expectedActions = [
                    { type: 'ANALYZER_FETCH_DATA_LOADING', loading: true },
                    { type: 'ANALYZER_FETCH_DATA_LOADING', loading: false },
                    { type: 'ANALYZER_FETCH_DATA_SUCCESS', items: [] }
                ];
                expect(actions).toEqual(expectedActions);
            });
    });

    it('should execute fetch data with error', () => {
        const store = mockStore({});
        return store.dispatch(analyzerFetchData(''))
            .then(() => {
                const actions = store.getActions();
                const expectedActions = [
                    { type: 'ANALYZER_FETCH_DATA_LOADING', loading: true },
                    { type: 'ANALYZER_FETCH_DATA_ERROR', error: true }
                ];
                expect(actions).toEqual(expectedActions);
            });
    });
});