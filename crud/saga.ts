/* eslint-disable @typescript-eslint/no-redeclare */
/**
 * Authentication saga
 */

import { call, put, takeEvery, Effect, all } from 'redux-saga/effects';
import { get, getSingleById, post, update } from 'utils/apiProvider';
import { CREATE_RECORD, CrudAction, FT_COLLECTION, FT_RECORD, UPDATE_ERROR, UPDATE_RECORD } from './types';

function* fetchCollection(action: CrudAction): Generator<Effect, void, any> {
  const { path, params } = action.payload;
  const { success, failure } = action.meta;
  const meta = {
    ...action.meta,
    fetchTime: Date.now(),
  };
  try {
    const resp = yield call(get, path, params);
    yield put({
      meta,
      type: success,
      payload: {
        data: resp.collections,
      },
    });
  } catch (error) {
    yield put({ meta, type: failure, error: error.message });
  }
}

function* fetchRecord(action: CrudAction): Generator<Effect, void, any> {
  const { path, params } = action.payload;
  const { success, failure } = action.meta;
  const meta = {
    ...action.meta,
    fetchTime: Date.now(),
  };
  try {
    const resp = yield call(getSingleById, path, params);

    yield put({
      meta,
      type: success,
      payload: {
        data: resp,
      },
    });
  } catch (error) {
    yield put({ meta, type: failure, error: error.message });
  }
}

function* createRecord(action: CrudAction): Generator<Effect, void, any> {
  const { path, params } = action.payload;
  const { success, failure } = action.meta;
  const meta = {
    ...action.meta,
    fetchTime: Date.now(),
  };
  try {
    const resp = yield call(post, path, params);
    yield put({ meta, type: success, payload: resp });
  } catch (error) {
    yield put({ meta, type: failure, error: error.message });
  }
}

function* updateRecord(action: CrudAction): Generator<Effect, void, any> {
  const { path, params } = action.payload;
  const { success, failure } = action.meta;
  const meta = {
    ...action.meta,
    fetchTime: Date.now(),
  };
  try {
    const resp = yield call(update, path, params);
    yield put({ meta, type: success, payload: resp });
  } catch (error) {
    yield put({ meta, type: failure, error: error.message });
  }
}

function* crudSaga() {
  yield all([
    yield takeEvery(FT_COLLECTION, fetchCollection),
    yield takeEvery(FT_RECORD, fetchRecord),
    yield takeEvery(CREATE_RECORD, createRecord),
    yield takeEvery(UPDATE_RECORD, updateRecord),
  ]);
}

export default crudSaga;
