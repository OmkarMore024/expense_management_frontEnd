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
        // console.log(action.payload.household);
        // state.houseHolds  = state.houseHolds.map((household) => {
        //   if (household._id === action.payload.household._id) {
        //     household = action.payload.household;
        //   }
        //   return household;
        // });
        return {
          ...state,
          users: [...state.users],
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
