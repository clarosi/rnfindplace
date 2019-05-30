import {
  LOGIN_USER_STARTS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from './types';

export const userSignIn = ({ email, password }) => {
  return {
    type: LOGIN_USER_STARTS
  };
};

const userSignInSucces = () => ({
  type: LOGIN_USER_SUCCESS
});

const userSignInFailed = () => ({
  type: LOGIN_USER_FAILED
});
