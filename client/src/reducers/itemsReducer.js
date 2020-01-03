import {
  GET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  LOAD_ITEMS
} from "../actions/types.js";

const initialState = {
  items: [],
  loadingItems: false
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loadingItems: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(items => items._id !== action.id)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case LOAD_ITEMS:
      return {
        ...state,
        loadingItems: true
      };
    default:
      return state;
  }
};

export default items;
