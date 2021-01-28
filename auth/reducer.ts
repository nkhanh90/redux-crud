/* eslint-disable no-param-reassign */
import produce, { Draft } from 'immer';

import authProvider from 'utils/authProvider';
import { BaseAction } from 'redux/types';
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  AuthState,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILURE,
} from './types';

// load token object from localStorage if exists
const token = authProvider.getToken();
const tokenData = authProvider.getTokenData();

export const initialState = {
  token,
  user: { ...tokenData, fromCache: true } || false,
  pending: false,
  error: false,
};

const myReducer = (state: AuthState = initialState, action: BaseAction) =>
  produce(state, (draft: Draft<AuthState>) => {
    const { type, payload, error } = action;
    switch (type) {
      case USER_LOGIN:
        draft.pending = true;
        draft.error = false;
        break;
      case USER_LOGIN_SUCCESS:
        draft.pending = false;
        draft.token = payload;
        draft.error = false;
        break;
      case USER_LOGIN_ERROR:
        draft.pending = false;
        draft.error = error;
        break;
      case USER_LOAD_SUCCESS:
        draft.user = payload;
        break;
      case USER_LOAD_FAILURE:
        draft.user = false;
        break;
      default:
    }
  });

export default myReducer;
