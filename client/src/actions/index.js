import {
  GET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  LOAD_ITEMS,
  GET_ITEMS_ERROR
} from "./types.js";
import axios from "axios";

export const getItems = () => dispatch => {
  const options = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
      "Content-type": "application/json"
    }
  };

  dispatch(loadItems());

  axios
    .get("/api/items", options)
    .then(function(response) {
      dispatch({
        type: GET_ITEMS,
        payload: response.data
      });
    })
    .catch(function(error) {
      dispatch({
        type: GET_ITEMS_ERROR,
        msg: error.response.data.msg,
        status: error.response.status
      });
    });
};

export const deleteItem = idItem => dispatch => {
  axios({
    method: "delete",
    url: "/api/items",
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
    url: "/api/items",
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
});
