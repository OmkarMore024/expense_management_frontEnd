import * as actions from "../actions/actionTypes";

export const registerReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case actions.REGISTER_USER:
      return state;

    default:
      return state;
  }
};
