import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = "http://localhost:3111/api/householdexpenses";

export const getAllDailyExpenses = () => (dispatch) => {
  axios
    .get(apiEndPoint)
    .then((response) => {
      //   console.log(response.data);
      return dispatch({
        type: actions.GET_DAILY_EXPENSES,
        payload: { houseHoldExpenses: response.data },
      });
    })
    .catch((err) => console.log(err.message));
};

export const addDaliyExpense = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
      //   console.log(res.data);
      dispatch({
        type: actions.ADD_DAILY_EXPENSE,
        payload: {
          houseHoldExpense: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};

export const deleteDailyExpense = (id) => (dispatch, getState) => {
  console.log("in delete daily expenses:", id);
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((res) => {
    //   console.log(res.data);
      dispatch({
        type: actions.DELETE_DAILY_EXPENSE,
        payload: {
          deletehouseHoldExpense: res.data,
        },
      });
    })
    .catch((err) => console.log(err.message));
};

// export const getCurrentPeriodicExpense = (id) => (dispatch, getState) => {
//   axios
//     .get(apiEndPoint + `/${id}`, {
//       headers: { "x-auth-token": getState().loginReducer.token },
//     })
//     .then((res) => {
//       //   console.log(res.data);
//       dispatch({
//         type: actions.GET_PAYMENT_DETAILS_BY_ID,
//         payload: {
//           periodicPayment: res.data,
//         },
//       });
//     })
//     .catch((err) => console.log(err.message));
// };

// export const updatePeriodicPayment = (data) => (dispatch, getState) => {
//   let id = data._id;
//   delete data._id;
//   axios
//     .put(apiEndPoint + `/${id}`, data, {
//       headers: { "x-auth-token": getState().loginReducer.token },
//     })
//     .then((response) => {
//       //   console.log(response.data);
//       return dispatch({
//         type: actions.UPDATE_PAYMENT_DETAILS,
//         payload: { periodicPayment: response.data },
//       });
//     })
//     .catch((err) => console.log(err.message));
//   //   console.log(user);
// };
