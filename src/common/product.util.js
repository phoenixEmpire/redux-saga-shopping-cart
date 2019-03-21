import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

// 获取可见商品
export function getVisibleProducts(state) {
  return state.visibleIds.map(id => getProduct(state, id));
}

// 获取商品
export function getProduct(state, id) {
  return state.byId[id];
}

// 某个商品加入/移出购物车时，调整其库存数量
export function product(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        inventory: state.inventory + 1
      };
    default:
      return state;
  }
}
