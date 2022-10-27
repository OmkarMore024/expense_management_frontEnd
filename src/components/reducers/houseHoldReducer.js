import * as actions from "../actions/actionTypes";

export const houseHoldReducer = (state = { houseHolds: [] }, action) => {
  switch (action.type) {
    case actions.GET_HOUSHOLDS:
      return {
        ...state,
        houseHolds: action.payload.households,
      };

    case actions.ADD_HOUSEHOLD:
      return {
        ...state,
        houseHolds: [...state.houseHolds, { ...action.payload.household }],
      };

    case actions.GET_PRIMARY_HOUSHOLDS:
      return {
        ...state,
        houseHolds: action.payload.households,
      };

    default:
      return state;
  }
};
