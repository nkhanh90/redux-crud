import { Saga } from 'redux-saga';
import { StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./store').default>;

  export type RootState = StateType<typeof import('./rootReducer').default>;
  export type ReducerMap = Partial<{ [k in NamespaceKey]: Reducer<FullStoreShape[k]> }>;

  export type SagaMap = Partial<{ [k in NamespaceKey]: Saga<FullStoreShape[k]> }>;
}
