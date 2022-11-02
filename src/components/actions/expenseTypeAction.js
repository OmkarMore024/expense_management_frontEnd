import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = "http://localhost:3111/api/" + "expensetypes";

export const getAllExpenseTypes = (titleName) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/pfs", titleName, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      dispatch({
        type: actions.GET_EXPENSE_TYPES,
        payload: { expenses: res.data },
      });
    })
    .catch((err) => console.log(err.message));
};
export const getCurrentExpenseType = (id) => (dispatch, getState) => {
  //   console.log(id);
  axios
    .get(apiEndPoint + `/${id}`)
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.GET_EXPENSE_TYPE_BY_ID,
        payload: { currentExpense: response.data },
      });
    })
    .catch((err) => console.log(err.message));
};

// get it by pfs

export const addExpenseType = (data) => (dispatch, getState) => {
  console.log(data);
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: actions.ADD_EXPENSE_TYPE,
        payload: {
          expense: res.data,
        },
      });
    });
};
//
export const updateExpenseType = (data) => (dispatch, getState) => {
  // let id = data._id;
  // delete data._id;
  console.log(typeof data._id, data._id);

  axios
    .put(apiEndPoint + "/" + data._id, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: actions.UPDATE_EXPENSE_TYPE,
        payload: {
          expense: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};

export const deleteExpenseType = (id) => (dispatch, getState) => {
  console.log("in delete expenseType:", id);
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: actions.DELETE_EXPENSE_TYPE,
        payload: {
          deleteExpense: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};
