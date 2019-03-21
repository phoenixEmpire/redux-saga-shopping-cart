import { combineReducers } from "redux";
import products from "./product.reducer";
import cart from "./cart.reducer";
import { ADD_TO_CART } from "../actions";
/*
  Redux仓库结构：
  {
    products:{
      visibleIds:[],
      byId:{}
    },
    cart:{
      quantityById:{},
      checkoutStatus:{
        checkoutPending: false,
        error: null
      }
    }
  }
*/

// 对商品Reducer、购物车Reducer再次合并
const shoppingCart = combineReducers({
  products,
  cart
});

export default function rootReducer(state, action) {
  // 非法情况直接返回：库存为0的商品不能加入购物车
  if (
    action.type == ADD_TO_CART &&
    state.products.byId[action.productId].inventory <= 0
  ) {
    return state;
  }
  // 正常情况
  return shoppingCart(state, action);
}
