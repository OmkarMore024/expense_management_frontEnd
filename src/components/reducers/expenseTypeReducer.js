import * as actions from "../actions/actionTypes";

export const expenseTypeReducer = (
  state = { expenses: [], currentExpense: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_EXPENSE_TYPES:
      console.log("checking", action.payload.expenses);
      return { ...state, expenses: action.payload.expenses };

    case actions.GET_EXPENSE_TYPE_BY_ID:
      // console.log("checking", action.payload.expenses);
      return { ...state, currentExpense:{ ...action.payload.currentExpense} };

    case actions.ADD_EXPENSE_TYPE:
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload.expense }],
      };

    case actions.UPDATE_EXPENSE_TYPE:
      const newArr1 = [...state.expenses];
      return {
        ...state,
        expenses: newArr1,
      };

    case actions.DELETE_EXPENSE_TYPE:
      console.log(action.payload.deleteExpense._id);
      const newArr = state.expenses.filter((e) => {
        return e._id !== action.payload.deleteExpense._id;
      });
      console.log(newArr);

      return {
        ...state,
        expenses: newArr,
      };

    default:
      return state;
  }
};
