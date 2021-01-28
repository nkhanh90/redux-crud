/* eslint-disable @typescript-eslint/indent */
const scope = process.env.REACT_APP_BASENAME;

export const FT_COLLECTION = `${scope}/FT_COLLECTION`;
export const FT_COLLECTION_ERROR = `${scope}/FT_COLLECTION_ERROR`;
export const FT_COLLECTION_SUCCESS = `${scope}/FT_COLLECTION_SUCCESS`;

export const FT_RECORD = `${scope}/FT_RECORD`;
export const FT_RECORD_ERROR = `${scope}/FT_RECORD_ERROR`;
export const FT_RECORD_SUCCESS = `${scope}/FT_RECORD_SUCCESS`;

export const CREATE_RECORD = `${scope}/CREATE`;
export const CREATE_ERROR = `${scope}/CREATE_ERROR`;
export const CREATE_SUCCESS = `${scope}/CREATE_SUCCESS`;

export const UPDATE_RECORD = `${scope}/UPDATE`;
export const UPDATE_ERROR = `${scope}/UPDATE_ERROR`;
export const UPDATE_SUCCESS = `${scope}/UPDATE_SUCCESS`;

export const DELETE_RECORD = `${scope}/DELETE`;
export const DELETE_SUCCESS = `${scope}/DELETE_SUCCESS`;
export const DELETE_ERROR = `${scope}/DELETE_ERROR`;

export const CLEAR_ACTION_STATUS = `${scope}/CLEAR_ACTION_STATUS`;

export type CrudAction = {
  type:
    | typeof FT_COLLECTION
    | typeof FT_RECORD
    | typeof UPDATE_RECORD
    | typeof CREATE_RECORD
    | typeof DELETE_RECORD
    | typeof CLEAR_ACTION_STATUS;
  meta: Meta;
  error?: any;
  payload: {
    path: string;
    params: any;
    data?: [];
  };
};

export type ClearActionStatus = {
  type: typeof CLEAR_ACTION_STATUS;
  payload: {
    model: Model;
  };
};

export type Meta = {
  success?: string;
  failure?: string;
  id?: string | number;
  model: Model;
};

export type Model = string;
export type ID = string;

export type CollectionProps = {
  payload: [] | null;
  pending: boolean;
  success: boolean | null;
};

export type ActionStatusProps = {} | { create?: {}; update?: {}; delete?: {} };

export type ByIDProps = {
  payload: {};
  pending: boolean;
  success: boolean | null;
};

export type CrudModel = {
  collections: CollectionProps;
  byId: ByIDProps;
  actionStatus: Object;
};

export type CrudState = {
  [modelName: string]: CrudModel;
};
