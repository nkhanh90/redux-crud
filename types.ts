import { AuthState } from './auth/types';
import { CrudState } from './crud/types';

export interface BaseAction {
  type: string;
  payload?: object;
  meta: {
    success?: string;
    failure?: string;
    cancel?: string;
    redirect?: string;
  };
  error?: string;
}

export interface State {
  auth: AuthState;
  crudState: CrudState;
}
