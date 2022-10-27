
import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = "http://localhost:3111/api/" + "users";

export const getAllUsers = () => (dispatch) => {
    console.log("in user action get");
  axios
    .get(apiEndPoint)
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

