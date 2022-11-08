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

    case actions.DELETE_PAYMENT_DETAIL:
      console.log(action.payload.deleteMember._id);
      const delnewArr = state.paymentDetails.filter((e) => {
        return e._id !== action.payload.periodicPayment._id;
      });
      //   console.log(newArr);

      return {
        ...state,
        paymentDetails: delnewArr,
      };

    default:
      return state;
  }
};
