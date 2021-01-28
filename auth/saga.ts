/* eslint-disable @typescript-eslint/no-redeclare */
/**
 * Authentication saga
 */

import { call, put, takeEvery, takeLatest, select, cancelled } from 'redux-saga/effects';
import authProvider from 'utils/authProvider';
import { push } from 'connected-react-router';
import { BaseAction } from 'redux/types';
import { USER_LOGIN, USER_CHECK, USER_LOAD } from './types';
import { userLoad } from './actions';

function* userLogin(action: BaseAction) {
  const { payload, meta } = action;
  const { success, failure, redirect } = meta;
  try {
    const resp = yield call(authProvider.login, payload);
    yield put({ meta, type: success, payload: resp });
    yield put(push(redirect || '/'));
  } catch (error) {
    yield put({ meta, type: failure, error: error.message });
  }
}

function* userCheck(action: BaseAction) {
  const { redirect } = action.meta;
  try {
    yield call(authProvider.checkAuth);
    const { auth } = yield select();
    if (!auth.user || auth.user.fromCache) {
      yield put(userLoad());
    }
  } catch (error) {
    yield put(push(redirect || '/login'));
    yield call(authProvider.logout);
  }
}

function* loadUser(action: BaseAction) {
  const { meta } = action;
  const { success, failure, cancel } = meta;
  try {
    const userDetails = yield call(authProvider.getUserDetails);
    yield put({ meta, type: success, payload: userDetails });
  } catch (error) {
    yield put({ meta, type: failure, error: error.message });
  } finally {
    if (yield cancelled()) {
      yield put({ meta, type: cancel });
    }
  }
}

function* authSaga() {
  yield takeLatest(USER_LOGIN, userLogin);
  yield takeEvery(USER_CHECK, userCheck);
  yield takeEvery(USER_LOAD, loadUser);
}

export default authSaga;
