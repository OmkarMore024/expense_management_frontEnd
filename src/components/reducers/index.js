import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { registerReducer } from "./registerReducer";
import { expenseTypeReducer } from "./expenseTypeReducer";
import { userReducer } from "./usersReducer";

export default combineReducers({
  registerReducer,
  loginReducer,
  expenseTypeReducer,
  userReducer,
});
