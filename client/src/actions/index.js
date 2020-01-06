import {
  GET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  LOAD_ITEMS
} from "./types.js";
import axios from "axios";

export const getItems = () => dispatch => {
  dispatch(loadItems());

  axios
    .get('/api/items')
    .then(function(response) {
      dispatch({
        type: GET_ITEMS,
        payload: response.data
      });
    })
    .catch(function(error) {
      return {
        type: GET_ITEMS,
        payload: error
      };
    });
};

export const deleteItem = idItem => dispatch => {
  axios({
    method: "delete",
    url: '/api/items',
    data: {
      id: idItem
    }
  }).then(() => {
    dispatch({
      type: DELETE_ITEM,
      id: idItem
    });
  });
};

export const addItem = name => dispatch => {
  axios({
    method: "post",
    url: '/api/items',
    data: {
      name: name
    }
  }).then(response => {
    dispatch({
      type: ADD_ITEM,
      payload: response.data
    });
  });
};

export const loadItems = () => ({
    type: LOAD_ITEMS
  })