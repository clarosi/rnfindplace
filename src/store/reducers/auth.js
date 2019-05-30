import {
  LOGIN_USER_STARTS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_STARTS:
      return Object.assign({}, state, { loading: true });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { loading: false });
    case LOGIN_USER_FAILED:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
};

export default authReducer;
