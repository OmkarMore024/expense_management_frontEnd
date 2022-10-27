import * as actions from "../actions/actionTypes";

export const userReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case actions.GET_USERS:
      return { ...state, users: action.payload.users };

    case actions.SOFT_DELETE_USER:
      return {
        ...state,
        users: action.payload.users,
      };

    default:
      return state;
  }
};
