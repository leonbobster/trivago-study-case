import { combineReducers } from 'redux';
import {
    analyzerFetchDataError,
    analyzerFetchDataLoading,
    analyzerFetchDataSuccess
} from './analyzer';
import {
    reviewsFetchDataError,
    reviewsFetchDataLoading,
    reviewsFetchDataSuccess
} from './reviews';

export default combineReducers({
    analyzerFetchDataError,
    analyzerFetchDataLoading,
    analyzerFetchDataSuccess,
    reviewsFetchDataError,
    reviewsFetchDataLoading,
    reviewsFetchDataSuccess
});