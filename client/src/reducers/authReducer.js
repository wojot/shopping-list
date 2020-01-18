import { REGISTER } from "../actions/types";

const initialState = {};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return Object.assign(action.payload, state);
    default:
      return state;
  }
}

export default auth;