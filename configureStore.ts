/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { History } from 'history';
import { ReducerMap, SagaMap } from 'typesafe-actions';
import rootReducer from './reducers';
import rootSaga from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface InjectedStore extends Store {
  injectedReducers: ReducerMap;
  injectedSagas: SagaMap;
  runSaga(saga: Saga | (() => IterableIterator<any>) | undefined, args: any | undefined): any;
}

export default function configureStore(initialState = {}, history: History) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store: InjectedStore = createStore(rootReducer(history), initialState, composeEnhancers(...enhancers));

  // Root Saga
  sagaMiddleware.run(rootSaga);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
}
