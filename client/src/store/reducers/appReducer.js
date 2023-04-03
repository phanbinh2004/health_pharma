import actionTypes from "../actions/actionTypes";
const initialState = {
  started: true,
  product: [],
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };
    case actionTypes.GET_ALL_PRODUCT:
      return {
        ...state,
      };
    case actionTypes.GET_ALL_PRODUCT_FAILED:
      state.product = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      state.product = action.res.products;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default appReducer;
