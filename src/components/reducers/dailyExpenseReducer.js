import * as actions from "../actions/actionTypes";

export const dailyExpenseReducer = (
  state = { dailyExpenses: [], currentExpense: {} },
  action
) => {
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

    case actions.GET_CURRENT_DAILYEXPENSE:
      return {
        ...state,
        currentExpense: { ...action.payload.dailyExpense },
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
    case actions.UPDATE_DAILY_EXPENSE:
      const updatedArr = [...state.dailyExpenses];
      return {
        ...state,
        dailyExpenses: updatedArr,
      };

    default:
      return state;
  }
};
