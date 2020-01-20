import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  CLEAR_MSGS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "../actions/types";

const initialState = {
  user: {},
  isAuthenticated: false,
  token: "",
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

// {type: "LOGIN_ERROR", msg: "Email not found!", status: 500}
// type: "LOGIN_ERROR"
// msg: "Email not found!"
// status: 500
// __proto__: Object
// xhr.js:155 POST http://localhost:3000/api/auth 500 (Internal Server Error)
// authReducer.js:35
// {type: "LOGIN_ERROR", msg: "Wrong password!", status: 500}
// type: "LOGIN_ERROR"
// msg: "Wrong password!"
// status: 500
// __proto__: Object
// authReducer.js:32
// {type: "LOGIN_SUCCESS", userPayload: {…}, msg: "Login successful!", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlM…Tg0fQ.v6TeWfnViK0XBqb0nwP4ExX2Wf8lOfHZjDeJpVTIZ9Q"}
// type: "LOGIN_SUCCESS"
// userPayload: {id: "5e25f2b20c85e50b5ddae3a9", email: "wojtek", added: "2020-01-20T18:34:26.147Z"}
// msg: "Login successful!"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjVmMmIyMGM4NWU1MGI1ZGRhZTNhOSIsImlhdCI6MTU3OTU0NjU4NCwiZXhwIjoxNTc5NTUwMTg0fQ.v6TeWfnViK0XBqb0nwP4ExX2Wf8lOfHZjDeJpVTIZ9Q"
// __proto__: Object
