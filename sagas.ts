import { all, fork } from 'redux-saga/effects';

import authSaga from 'redux/auth/saga';
import crudSaga from 'redux/crud/saga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(crudSaga)]);
}
