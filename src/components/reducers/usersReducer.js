import * as actions from "../actions/actionTypes";

export const userReducer = (state = { users: [], currentUser: {} }, action) => {
  switch (action.type) {
    case actions.GET_USERS:
      return { ...state, users: action.payload.users };

    case actions.SOFT_DELETE_USER:
      return {
        ...state,
        users: action.payload.users,
      };

    case actions.UPDATE_USER:
      const newArr = [...state.users];

      return {
        ...state,
        users: newArr,
      };

    case actions.RESET_PASSWORD:
      // const newArr = [...state.users];
      return {
        ...state,
        user: { ...action.payload.user },
      };

    case actions.UPDATE_PASSWORD:
      // const newArr = [...state.users];
      return {
        ...state,
        currentUser: { ...action.payload.user },
      };

    case actions.DELETE_USER:
      // const newArr = [...state.users];
      const deleNewArr = state.users.filter((e) => {
        return e._id !== action.payload.deleteUser._id;
      });
      //   console.log(newArr);

      return {
        ...state,
        members: deleNewArr,
      };

    case actions.GET_USER_BY_ID:
      return {
        ...state,
        currentUser: { ...action.payload.user },
      };

    default:
      return state;
  }
};
