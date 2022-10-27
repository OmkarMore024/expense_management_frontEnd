import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = "http://localhost:3111/api/households";

// console.log(apiEndPoint);

export const getAllHouseHolds = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      console.log(response.data);
      return dispatch({
        type: actions.GET_HOUSHOLDS,
        payload: { households: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  //   console.log(user);
  //   console.log(apiEndPoint);
};

export const getPrimarysHouseHolds =
  (primaryuserId) => (dispatch, getState) => {
    axios
      .post(
        apiEndPoint + "/getHouseHold",
        { primaryuserId },
        {
          headers: { "x-auth-token": getState().loginReducer.token },
        }
      )
      .then((response) => {
        //   console.log(response.data);
        return dispatch({
          type: actions.GET_PRIMARY_HOUSHOLDS,
          payload: { households: response.data },
        });
      })
      .catch((err) => console.log(err.message));
    //   console.log(user);
    //   console.log(apiEndPoint);
  };

export const addHouseHold = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.ADD_HOUSEHOLD,
        payload: { household: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  //   console.log(user);
  //   console.log(apiEndPoint);
};
