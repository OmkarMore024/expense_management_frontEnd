import * as actions from "../actions/actionTypes";
import jwt_decode from "jwt-decode";

export const loginReducer = (state = { token: "", userInfo: {} }, action) => {
  switch (action.type) {
    case actions.LOGIN_USER:
      console.log(action.payload.token);
      const decoded = jwt_decode(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        userInfo: { ...decoded },
      };

    case actions.LOGOUT_USER:
      console.log("in logout reducer:", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return state;
  }
};
