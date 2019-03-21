import { combineReducers } from "redux";
import { RECEIVE_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART } from "../actions";
import { product } from "../common/product.util";

function visibleIds(state = [], action) {
  switch (action.type) {
    // 保存id列表：所有可供选择的商品
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id);
    default:
      return state;
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    // 保存商品列表：所有可供选择的商品
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product;
          return obj;
        }, {})
      };
    // 其它操作：商品加入/移出购物车
    default:
      const { productId } = action;
      if (productId) {
        return {
          ...state,
          [productId]: product(state[productId], action)
        };
      }
      return state;
  }
}

export default combineReducers({
  visibleIds,
  byId
});
