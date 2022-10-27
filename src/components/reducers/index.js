import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import { expenseTypeReducer } from "./expenseTypeReducer";
import { userReducer } from "./usersReducer";
import { dailyExpenseReducer } from "./dailyExpenseReducer";
import { houseHoldReducer } from "./houseHoldReducer";
import { memberReducer } from "./memberReduce";
import { paymentDetailsReducer } from "./paymentDetailsReducer";

export default combineReducers({
  registerReducer,
  loginReducer,
  expenseTypeReducer,
  userReducer,
  // dailyExpenseReduc,
});
