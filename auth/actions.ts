/*
 * App Global Actions
 */

import { BaseAction } from 'redux/types';
import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  USER_CHECK,
  USER_LOAD,
  USER_LOAD_FAILURE,
  USER_LOAD_SUCCESS,
  USER_LOAD_CANCELLED,
} from './types';

export const userLogin = (payload: object, redirect: string): BaseAction => ({
  type: USER_LOGIN,
  payload,
  meta: {
    redirect,
    success: USER_LOGIN_SUCCESS,
    failure: USER_LOGIN_ERROR,
  },
});

export const userCheck = (payload: {}, redirect: string): BaseAction => ({
  type: USER_CHECK,
  payload,
  meta: {
    redirect,
  },
});

export const userLoad = (): BaseAction => ({
  type: USER_LOAD,
  meta: { success: USER_LOAD_SUCCESS, failure: USER_LOAD_FAILURE, cancel: USER_LOAD_CANCELLED },
});
