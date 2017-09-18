import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('<App />', () => {
  let app;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    analyzerFetchDataError: false,
    analyzerFetchDataLoading: false,
    analyzerFetchDataSuccess: [],
    reviewsFetchData: false,
    reviewsFetchDataLoading: false,
    reviewsFetchDataSuccess: []
  });

  beforeEach(() => {
    app = mount(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  });

  it('has navigation', () => {
    const links = app.find('LinkContainer');
    expect(links).toHaveLength(3);
    expect(links.get(0).props.to).toEqual('/');
    expect(links.get(1).props.to).toEqual('/review-list');
    expect(links.get(2).props.to).toEqual('/topic-list');
  });

  it('checks that menu navigation works', () => {
    expect(app.find('#analyzer')).toHaveLength(1);
    expect(app.find('#review-list')).toHaveLength(0);
    expect(app.find('#topic-list')).toHaveLength(0);

    app.find('a[href="/review-list"]').simulate('click', { button: 0 });
    expect(app.find('#review-list')).toHaveLength(1);

    app.find('a[href="/topic-list"]').simulate('click', { button: 0 });
    expect(app.find('#topic-list')).toHaveLength(1);

    app.find('a[href="/"]').simulate('click', { button: 0 });
    expect(app.find('#analyzer')).toHaveLength(1);
  });
});