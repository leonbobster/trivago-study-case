import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Analyzer from './Analyzer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Analyzer />', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    beforeEach(() => {

    });

    it('should render component', () => {
        const store = mockStore({
            analyzerFetchDataError: false,
            analyzerFetchDataLoading: false,
            analyzerFetchDataSuccess: [
                { id: 1, review: 'foo', topics: ['bar'], score: 3 },
                { id: 2, review: 'foo', topics: ['bar'], score: 3 },
                { id: 3, review: 'foo', topics: ['bar'], score: 3 }
            ]
        });
        const analyzer = mount(
            <Provider store={store}>
                <Analyzer />
            </Provider>
        );
        expect(analyzer.find('tbody > tr').length).toEqual(3);
    });
});