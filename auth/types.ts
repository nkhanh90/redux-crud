/*
 * Apptypes
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * types here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

const scope = process.env.REACT_APP_BASENAME;

// Auth
export const USER_LOGIN = `${scope}/USER_LOGIN`;
export const USER_LOGIN_ERROR = `${scope}/USER_LOGIN_ERROR`;
export const USER_LOGIN_SUCCESS = `${scope}/USER_LOGIN_SUCCESS`;

export const USER_CHECK = `${scope}/USER_CHECK`;

export const USER_LOAD = `${scope}/USER_LOAD`;
export const USER_LOAD_SUCCESS = `${scope}/USER_LOAD_SUCCESS`;
export const USER_LOAD_FAILURE = `${scope}/USER_LOAD_FAILURE`;
export const USER_LOAD_CANCELLED = `${scope}/USER_LOAD_CANCELLED`;

export type AuthState = {
  token: any;
  pending: boolean;
  error: any;
  user: any;
};
