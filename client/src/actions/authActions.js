import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAR_MSGS,
  LOGOUT,
  USER_LOADED
} from "./types";
const axios = require("axios");

export const loadUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const header = {
    headers: {
      "x-auth-token": token
    }
  };
  axios
    .get("http://localhost:5000/api/users/details", header)
    .then(response => {
      dispatch({ type: USER_LOADED, userPayload: response.data });
    })
    .catch(error => {
      dispatch({
        type: LOGOUT
      });
    });
};

export const register = user => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/users/register",
    data: {
      email: user.email,
      password: user.password
    }
  })
    .then(function(response) {
      if (response.status === 200) {
        dispatch(
          registerSuccess(
            response.data.registeredUser,
            response.data.msg,
            response.data.token
          )
        );
      } else {
        dispatch(registerError(response.status, response.data.msg));
      }
    })
    .catch(function(error) {
      dispatch(registerError(error.response.status, error.response.data.msg));
    });
};

export const registerError = (status, msg) => dispatch => {
  dispatch({ type: REGISTER_ERROR, status, msg });
};

export const registerSuccess = (userPayload, msg, token) => dispatch => {
  dispatch({ type: REGISTER_SUCCESS, userPayload, msg, token });
};

export const clearMsgs = () => dispatch => {
  dispatch({ type: CLEAR_MSGS });
};

export const login = userLoginData => dispatch => {
  axios({
    method: "post",
    url: "http://localhost:5000/api/auth",
    data: userLoginData
  })
    .then(function(response) {
      const userPayload = response.data.user;
      const msg = response.data.msg;
      const token = response.data.token;

      dispatch({ type: LOGIN_SUCCESS, userPayload, msg, token });
    })
    .catch(function(error) {
      const msg = error.response.data.msg;
      const status = error.response.status;

      dispatch({ type: LOGIN_ERROR, msg, status });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
