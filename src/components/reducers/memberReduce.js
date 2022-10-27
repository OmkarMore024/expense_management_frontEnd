import * as actions from "../actions/actionTypes";

export const memberReducer = (state = { members: [] }, action) => {
  switch (action.type) {
    case actions.GET_MEMBERS:
      return {
        ...state,
        members: action.payload.members,
      };

    case actions.GET_HOUSEHOLD_MEMBERS:
      let newArr2 = [];
      newArr2.push(action.payload.members);
       console.log(newArr2);
      return {
        ...state,
        members: action.payload.members,
      };

    case actions.DELETE_MEMBER:
      console.log(action.payload.deleteMember._id);
      const newArr = state.members.filter((e) => {
        return e._id !== action.payload.deleteMember._id;
      });
      //   console.log(newArr);

      return {
        ...state,
        members: newArr,
      };

    default:
      return state;
  }
};
