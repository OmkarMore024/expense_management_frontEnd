import * as actions from "../actions/actionTypes";

export const expenseTypeReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case actions.GET_EXPENSE_TYPES:
      return { ...state, expenses: action.payload.expenses };

    case actions.ADD_EXPENSE_TYPE:
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload.expense }],
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
