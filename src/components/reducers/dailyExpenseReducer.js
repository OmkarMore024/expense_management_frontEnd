import * as actions from "../actions/actionTypes";

export const dailyExpenseReducer = (state = { dailyExpenses: [] }, action) => {
  switch (action.type) {
    case actions.GET_DAILY_EXPENSES:
      return {
        ...state,
        dailyExpenses: action.payload.dailyExpenses,
      };

    case actions.ADD_DAILY_EXPENSE:
      return {
        ...state,
        dailyExpenses: [
          ...state.dailyExpenses,
          { ...action.payload.dailyExpense },
        ],
      };

    case actions.DELETE_DAILY_EXPENSE:
      // console.log(action.payload.deleteExpense._id);
      const newArr = state.dailyExpenses.filter((e) => {
        return e._id !== action.payload.deleteDailyExpense._id;
      });
      //   console.log(newArr);
      return {
        ...state,
        dailyExpenses: newArr,
      };
    // case actions.GET_PAYMENT_DETAILS_BY_ID:
    //   return {
    //     ...state,
    //     currentPayment: { ...action.payload.periodicPayment },
    //   };

    default:
      return state;
  }
};
