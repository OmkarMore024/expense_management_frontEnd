import { createStore } from "redux";
import rootReducer from "./components/reducers";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsDenylist, actionsCreators and other options if needed
  trace: true,
});

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
