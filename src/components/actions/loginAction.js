import * as actions from "./actionTypes";
import axios from "axios";

const apiEndPoint = process.env.REACT_APP_API_URL+ "login";
// const apiEndPoint = process.env.REACT_APP_API_URL + "users";

export const loginUser = (login) => (dispatch) => {
  // console.log(login);
  axios
    .post(apiEndPoint, login)
    .then((response) => {
      //for login
      sessionStorage.setItem("token", response.data);
      return dispatch({
        type: actions.LOGIN_USER,
        payload: { token: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  console.log(login);
};

export const loadLogin = () => ({
  type: actions.LOGIN_USER,
  payload: { token: sessionStorage.getItem("token") },
});

export const removeLogin = () => {
  console.log("in action remove");
  sessionStorage.setItem("token", "");
  return {
    type: actions.LOGOUT_USER,
    payload: { token: "" },
  };
};

// console.log(sessionStorage.getItem("token"));
// console.log(sessionStorage.clear());
