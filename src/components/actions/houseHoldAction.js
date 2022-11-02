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
  (primaryuserId,titleName) => (dispatch, getState) => {
    axios
      .post(
        apiEndPoint + "/getHouseHold",
        { primaryuserId,titleName },
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
export const updateHouseHold = (data) => (dispatch, getState) => {
  let id = data._id;
  delete data._id;
  axios
    .put(apiEndPoint + `/${id}`, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.UPDATE_HOUSHOLD,
        payload: { household: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  //   console.log(user);
  //   console.log(apiEndPoint);
};
export const getCurrentHouseHold = (id) => (dispatch, getState) => {
//   console.log(id);
  axios
    .get(apiEndPoint + `/${id}`)
    .then((response) => {
    //   console.log(response.data);
      return dispatch({
        type: actions.GET_HOUSEHOLD_BY_ID,
        payload: { household: response.data },
      });
    })
    .catch((err) => console.log(err.message));
};
