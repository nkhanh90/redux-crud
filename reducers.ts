/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from 'redux/auth/reducer';
import { History } from 'history';
import crudReducer from 'redux/crud/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

const rootReducer = (history: History<any>, injectedReducers = {}) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    crudState: crudReducer,
    ...injectedReducers,
  });

export default rootReducer;
