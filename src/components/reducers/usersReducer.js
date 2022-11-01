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

      case actions.DELETE_USER:
      // const newArr = [...state.users];
      const deleNewArr = state.members.filter((e) => {
            return e._id !== action.payload.deleteMember._id;
          });
          //   console.log(newArr);
    
          return {
            ...state,
            members: newArr,
          };
      
      return {
        ...state,
        users: newArr,
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
