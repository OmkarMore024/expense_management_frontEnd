import * as actions from "../actions/actionTypes";

export const paymentDetailsReducer = (
  state = { paymentDetails: [], currentPayment: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_PAYMENT_DETAILS:
      return {
        ...state,
        paymentDetails: action.payload.periodicPayment,
      };

    case actions.GET_PAYMENT_DETAILS_BY_ID:
      return {
        ...state,
        currentPayment: { ...action.payload.periodicPayment },
      };

    case actions.ADD_PAYMENT_DETAIL:
      return {
        ...state,
        paymentDetails: [
          ...state.paymentDetails,
          { ...action.payload.periodicPayment },
        ],
      };

    case actions.UPDATE_PAYMENT_DETAILS:
      const newArr = [...state.paymentDetails];
      return {
        ...state,
        paymentDetails: newArr,
      };

    // case actions.DELETE_MEMBER:
    //   console.log(action.payload.deleteMember._id);
    //   const newArr = state.members.filter((e) => {
    //     return e._id !== action.payload.deleteMember._id;
    //   });
    //   //   console.log(newArr);

    //   return {
    //     ...state,
    //     members: newArr,
    //   };

    default:
      return state;
  }
};
