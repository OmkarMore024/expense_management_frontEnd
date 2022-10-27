import * as actions from "../actions/actionTypes";

export const userReducer = (state = { users: [] }, action) => {
    
  switch (action.type) {
    case actions.GET_USERS:
      return { ...state, users: action.payload.users };
    
    case actions.

    default:
      return state;
  }
};
