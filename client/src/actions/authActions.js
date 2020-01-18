import { REGISTER_ERROR, REGISTER_SUCCESS } from "./types";
const axios = require("axios");

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
