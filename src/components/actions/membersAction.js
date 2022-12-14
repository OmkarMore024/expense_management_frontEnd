import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "householdmembers";

export const getAllMembers = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.GET_MEMBERS,
        payload: { members: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  //   console.log(user);
  //   console.log(apiEndPoint);
};

export const getAllMembersBypfs = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + `/pfs`, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.GET_MEMBERS,
        payload: { members: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  //   console.log(user);
  //   console.log(apiEndPoint);
};

export const getHouseHoldmembers = (houseHoldId) => (dispatch, getState) => {
  console.log(houseHoldId);
  axios
    .post(
      apiEndPoint + "/getHouseHoldMembers",
      { houseHoldId },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) => {
      console.log(response.data);
      return dispatch({
        type: actions.GET_HOUSEHOLD_MEMBERS,
        payload: { members: response.data },
      });
    })
    .catch((err) => console.log(err.message));
  //   console.log(user);
  //   console.log(apiEndPoint);
};

export const deleteHouseHoldMember = (id) => (dispatch, getState) => {
  console.log("in delete householdmember:", id);
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: actions.DELETE_MEMBER,
        payload: {
          deleteMember: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};

export const addMember = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      //   console.log(res.data);
      dispatch({
        type: actions.ADD_MEMBER,
        payload: {
          member: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};

//this for member dahsboard
export const getHouseHoldByMemberid = (id) => (dispatch, getState) => {
  axios
    .get(apiEndPoint + `/getHouseHoldsForMember/${id}`, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      //   console.log(res.data);
      dispatch({
        type: actions.GET_HOUSEHOLD_MEMBER_BY_ID,
        payload: {
          houseHolds: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};

export const getCurrentHouseholdMember = (id) => (dispatch, getState) => {
  axios
    .get(apiEndPoint + `/${id}`, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      //   console.log(res.data);
      dispatch({
        type: actions.GET_CURRENT_HOUSEHOLD_MEMBER,
        payload: {
          curretMember: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};
