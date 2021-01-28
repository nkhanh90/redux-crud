/* eslint-disable no-param-reassign */
import produce, { Draft } from 'immer';
import {
  FT_COLLECTION_ERROR,
  FT_COLLECTION_SUCCESS,
  FT_COLLECTION,
  CrudAction,
  CrudModel,
  CrudState,
  CollectionProps,
  ActionStatusProps,
  FT_RECORD,
  FT_RECORD_ERROR,
  FT_RECORD_SUCCESS,
  CREATE_RECORD,
  CREATE_SUCCESS,
  CREATE_ERROR,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
  UPDATE_RECORD,
  DELETE_RECORD,
  DELETE_SUCCESS,
  DELETE_ERROR,
  CLEAR_ACTION_STATUS,
} from './types';

const byIdInitialState = {
  pending: false,
  fetchTime: 0,
  record: {},
};

export const initialState = {};

const collectionDataState: any[] = [];

const collectionsInitialState = {
  data: collectionDataState,
  otherInfo: {},
};

const actionStatusInitialState = {};

export const modelInitialState = {
  byId: byIdInitialState,
  collections: collectionsInitialState,
  actionStatus: actionStatusInitialState,
};

const byIdImpl = (state: any, action: CrudAction) => {
  switch (action.type) {
    case FT_RECORD:
      return { ...state, pending: true, error: null, success: null, payload: null };
    case FT_RECORD_SUCCESS:
      return { ...state, pending: false, error: false, success: true, payload: action.payload.data };
    case FT_RECORD_ERROR:
      return { ...state, pending: false, error: action.error || true, success: false, payload: null };
    default:
      return state;
  }
};

const collectionsImpl = (state: CollectionProps, action: CrudAction) => {
  switch (action.type) {
    case FT_COLLECTION:
      return { ...state, pending: true, success: null, error: null, payload: null };
    case FT_COLLECTION_SUCCESS:
    case FT_COLLECTION_ERROR:
      return { ...state, pending: false, success: !action.error, payload: action.payload.data || null };
    default:
      return state;
  }
};

const actionSttImp = (state: ActionStatusProps, action: CrudAction) => {
  switch (action.type) {
    case CLEAR_ACTION_STATUS:
      return {};
    case CREATE_RECORD:
      return {
        create: {
          pending: true,
          success: null,
        },
      };
    case CREATE_SUCCESS:
    case CREATE_ERROR:
      return {
        create: {
          pending: false,
          success: !action.error,
          payload: action.payload,
        },
      };
    case UPDATE_RECORD:
      return {
        update: {
          pending: true,
          success: null,
        },
      };
    case UPDATE_SUCCESS:
    case UPDATE_ERROR:
      return {
        delete: {
          pending: false,
          success: !action.error,
          payload: action.payload,
        },
      };
    case DELETE_RECORD:
      return {
        delete: {
          pending: true,
          success: null,
        },
      };
    case DELETE_SUCCESS:
    case DELETE_ERROR:
      return {
        delete: {
          pending: false,
          success: !action.error,
          payload: action.payload,
        },
      };
    default:
      return state;
  }
};

const modelImpl = (
  state: CrudModel,
  action: CrudAction,
  { actionStatusReducer = actionSttImp, byIdReducer = byIdImpl, collectionsReducer = collectionsImpl } = {},
) => {
  switch (action.type) {
    case FT_COLLECTION:
    case FT_COLLECTION_SUCCESS:
    case FT_COLLECTION_ERROR:
    case FT_RECORD_SUCCESS:
    case FT_RECORD_ERROR:
    case FT_RECORD:
    case CREATE_RECORD:
    case CREATE_SUCCESS:
    case CREATE_ERROR:
    case UPDATE_RECORD:
    case UPDATE_SUCCESS:
    case UPDATE_ERROR:
    case CLEAR_ACTION_STATUS:
      return {
        ...state,
        collections: collectionsReducer(state?.collections, action),
        byId: byIdReducer(state?.byId, action),
        actionStatus: actionStatusReducer(state?.actionStatus, action),
      };
    default:
      return state;
  }
};

const crudReducer = (
  state: CrudState = {},
  action: CrudAction,
  { actionStatusReducer = actionSttImp, byIdReducer = byIdImpl, collectionsReducer = collectionsImpl } = {},
) =>
  produce(state, (draft: Draft<CrudState>) => {
    const { type } = action;
    const model = action?.meta?.model;
    switch (type) {
      case FT_COLLECTION:
      case FT_COLLECTION_SUCCESS:
      case FT_COLLECTION_ERROR:
      case FT_RECORD_SUCCESS:
      case FT_RECORD_ERROR:
      case FT_RECORD:
      case CREATE_RECORD:
      case CREATE_SUCCESS:
      case CREATE_ERROR:
      case UPDATE_RECORD:
      case UPDATE_SUCCESS:
      case UPDATE_ERROR:
      case CLEAR_ACTION_STATUS:
        draft[model] = modelImpl(state[model], action, { actionStatusReducer, byIdReducer, collectionsReducer });
        break;
      default:
    }
  });

export default crudReducer;
