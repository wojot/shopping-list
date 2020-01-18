import { REGISTER } from "./types";
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
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });

// received    data: {msg: "Dodano uzytkownika email@gmail.com", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlM…TU4fQ.auUj2qWtqmYUObf41BCQ__coRekzeCvyzuDzwj1jdjc", registeredUser: {…}}


  dispatch({ type: REGISTER, payload: user });
};
