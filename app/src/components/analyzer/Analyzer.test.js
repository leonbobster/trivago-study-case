import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { Analyzer } from './Analyzer';

describe('<Analyzer />', () => {
    it('should render component', () => {
        const props = {
            loading: false,
            error: false,
            scores: [
                { id: 1, review: 'bar', topics: ['baz', 'bat'] },
                { id: 2, review: 'bar', topics: ['baz', 'bat'] },
                { id: 3, review: 'bar', topics: ['baz', 'bat'] }
            ]
        };
        const analyzer = mount(<Analyzer data={props} />);
        expect(analyzer.find('tbody > tr').length).toEqual(3);
    });
});