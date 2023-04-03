import { handleGetAllProduct } from "../../services/userServices";
import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});
export const getAllProduct = (id) => {
  return async function (dispatch, getstate) {
    try {
      let res = await handleGetAllProduct(id);
      if (res && res.errCode === 0) {
        dispatch(getProductSuccess(res));
      } else {
        dispatch(getProductFailed(res));
      }
    } catch (e) {
      dispatch(getProductFailed());
    }
  };
};

export const getProductSuccess = (res) => ({
  type: "GET_ALL_PRODUCT_SUCCESS",
  res: res,
});
export const getProductFailed = (res) => ({
  type: "GET_ALL_PRODUCT_FAILED",
  res: res,
});
