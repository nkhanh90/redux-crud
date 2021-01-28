import {
  FT_COLLECTION,
  FT_COLLECTION_ERROR,
  FT_COLLECTION_SUCCESS,
  CrudAction,
  FT_RECORD,
  FT_RECORD_SUCCESS,
  FT_RECORD_ERROR,
  CREATE_ERROR,
  CREATE_RECORD,
  CREATE_SUCCESS,
  UPDATE_ERROR,
  UPDATE_RECORD,
  UPDATE_SUCCESS,
  ClearActionStatus,
  CLEAR_ACTION_STATUS,
} from './types';

export const fetchCollection = (model: string, path: string, params: Object = {}): CrudAction => {
  return {
    type: FT_COLLECTION,
    meta: {
      success: FT_COLLECTION_SUCCESS,
      failure: FT_COLLECTION_ERROR,
      model,
    },
    payload: {
      path,
      params,
    },
  };
};

export const fetchRecord = (model: string, path: string, params: Object = {}): CrudAction => {
  return {
    type: FT_RECORD,
    meta: {
      success: FT_RECORD_SUCCESS,
      failure: FT_RECORD_ERROR,
      model,
    },
    payload: {
      path,
      params,
    },
  };
};

export const createRecord = (model: string, path: string, params: Object = {}): CrudAction => {
  return {
    type: CREATE_RECORD,
    meta: {
      success: CREATE_SUCCESS,
      failure: CREATE_ERROR,
      model,
    },
    payload: {
      path,
      params,
    },
  };
};

export const updateRecord = (model: string, path: string, id: string | number, params: Object = {}): CrudAction => {
  return {
    type: UPDATE_RECORD,
    meta: {
      success: UPDATE_SUCCESS,
      failure: UPDATE_ERROR,
      model,
      id,
    },
    payload: {
      path,
      params,
    },
  };
};

export const clearActionStatus = (model: string): ClearActionStatus => {
  return {
    type: CLEAR_ACTION_STATUS,
    payload: { model },
  };
};
