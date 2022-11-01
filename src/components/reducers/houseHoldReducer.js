import * as actions from "../actions/actionTypes";

export const houseHoldReducer = (
  state = { houseHolds: [], currentHouseHold: {} },
  action
) => {
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

    case actions.UPDATE_HOUSHOLD:
      // console.log(action.payload.household);
      // state.houseHolds  = state.houseHolds.map((household) => {
      //   if (household._id === action.payload.household._id) {
      //     household = action.payload.household;
      //   }
      //   return household;
      // });
      const newArr = [...state.houseHolds];
      return {
        ...state,
        houseHolds: newArr,
      };

    case actions.GET_PRIMARY_HOUSHOLDS:
      return {
        ...state,
        houseHolds: action.payload.households,
      };

    case actions.GET_HOUSEHOLD_BY_ID:
      return {
        ...state,
        currentHouseHold: { ...action.payload.household },
      };

    default:
      return state;
  }
};
