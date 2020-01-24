import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  CLEAR_MSGS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  USER_LOADED
} from "../actions/types";

const initialState = {
  user: {},
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  msgErrorRegister: "",
  msgErrorLogin: "",
  msgSuccessRegister: "",
  msgSuccessLogin: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return { ...state, msgErrorRegister: action.msg };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        user: action.userPayload,
        msgSuccessRegister: action.msg,
        token: action.token,
        isAuthenticated: true
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.userPayload,
        token: action.token,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        msgSuccessLogin: action.msg,
        user: action.userPayload,
        token: action.token,
        isAuthenticated: true
      };
    case LOGIN_ERROR:
      return { ...state, msgErrorLogin: action.msg };
    case CLEAR_MSGS:
      return {
        ...state,
        msgErrorRegister: "",
        msgErrorLogin: "",
        msgSuccessRegister: "",
        msgSuccessLogin: ""
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
};

export default auth;
