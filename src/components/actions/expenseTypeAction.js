import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = "http://localhost:3111/api/" + "expensetypes";

export const getAllExpenseTypes = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((res) => {
      //   console.log(res.data);
      dispatch({
        type: actions.GET_EXPENSE_TYPES,
        payload: { expenses: res.data },
      });
    })
    .catch((err) => console.log(err.message));
};

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
