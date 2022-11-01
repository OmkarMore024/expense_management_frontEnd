import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = "http://localhost:3111/api/" + "users";

export const getAllUsers = (titleName) => (dispatch, getState) => {
  // console.log("in user action get");
  axios
    .post(apiEndPoint + "/pfs", titleName, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      dispatch({
        type: actions.GET_USERS,
        payload: { users: res.data },
      });
    })
    .catch((err) => console.log(err.message));
};

// export const addExpenseType = (data) => (dispatch, getState) => {
//   console.log(data);
//   axios.get(apiEndPoint, data).then((res) => {
//     console.log(res.data);
//     dispatch({
//       type: actions.ADD_EXPENSE_TYPE,
//       payload: {
//         expense: res.data,
//       },
//     });
//   });
// };

//soft delete
export const softDeleteExpenseType = (id) => (dispatch, getState) => {
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

export const getCurrentUser = (id) => (dispatch, getState) => {
  //   console.log(id);
  axios
    .get(apiEndPoint + `/${id}`)
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.GET_USER_BY_ID,
        payload: { user: response.data },
      });
    })
    .catch((err) => console.log(err.message));
};

export const updateUser = (data) => (dispatch, getState) => {
  //   console.log(data);
  axios
    .put(apiEndPoint + `/${data._id}`, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.UPDATE_USER,
        payload: { user: response.data },
      });
    })
    .catch((err) => console.log(err.message));
};
