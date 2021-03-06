import { combineReducers } from "redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
} from "../actions";

const initialState = {
  checkoutStatus: {
    checkoutPending: false,
    error: null
  },
  quantityById: {}
};

function checkoutStatus(state = initialState.checkoutStatus, action) {
  switch (action.type) {
    // 结账请求
    case CHECKOUT_REQUEST:
      return {
        checkoutPending: true,
        error: null
      };
    // 结账成功
    case CHECKOUT_SUCCESS:
      return initialState.checkoutStatus;
    // 结账失败
    case CHECKOUT_FAILURE:
      return {
        checkoutPending: false,
        error: action.error
      };
    default:
      return state;
  }
}

function quantityById(state = initialState.quantityById, action) {
  const { productId } = action;
  switch (action.type) {
    // 结账成功
    case CHECKOUT_SUCCESS:
      return initialState.quantityById;
    // 添加到购物车
    case ADD_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1
      };
    // 移出购物车
    case REMOVE_FROM_CART:
      const qty = (state[productId] || 0) - 1;
      const copy = { ...state };
      if (qty > 0) copy[productId] = qty;
      else delete copy[productId];
      return copy;
    default:
      return state;
  }
}

// 合并得到购物车Reducer
export default combineReducers({
  checkoutStatus,
  quantityById
});
