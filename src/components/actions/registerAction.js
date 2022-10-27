import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = "http://localhost:3111/api/users";
// const apiEndPoint = process.env.REACT_APP_API_URL + "users";
console.log(apiEndPoint);
// "http://localhost:3111/api/" + "users";

export const registerUser = (user) => (dispatch) => {
  axios
    .post(apiEndPoint, user)
    .then((response) => {
      console.log(response.data);
      return dispatch({
        type: actions.REGISTER_USER,
        payload: { user: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  console.log(user);
  //   console.log(apiEndPoint);
};